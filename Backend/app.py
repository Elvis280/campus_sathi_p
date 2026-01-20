"""
app.py: FastAPI backend for Campus Sathi RAG System.
Provides REST API endpoints for document management and querying.
"""

import os
import time
import shutil
from datetime import datetime
from typing import Optional, List, Dict, Any
from pathlib import Path

from fastapi import FastAPI, File, UploadFile, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

from Retrieval import get_vdb, get_file_hash, run_rag_pipeline
from Answer import answer_query, extract_entities_llm, build_context, generate_answer, optimize_chunks


# Initialize FastAPI app
app = FastAPI(
    title="Campus Sathi API",
    description="RAG-based Document Q&A System for Academic PDFs",
    version="1.0.0"
)

# CORS Configuration - Allow frontend access
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:8080",
        "http://localhost:3000",
        "https://*.onrender.com",  # Allow all Render subdomains
        # Add your custom domain here if you have one:
        # "https://your-custom-domain.com",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Data directory
DATA_DIR = Path("data")
DATA_DIR.mkdir(exist_ok=True)

# ============================================
# Pydantic Models for Request/Response
# ============================================

class QueryRequest(BaseModel):
    query: str = Field(..., description="Question to ask about the document(s)")
    document_id: Optional[str] = Field(None, description="Specific document hash to query (optional)")
    top_k: int = Field(5, ge=1, le=20, description="Number of chunks to retrieve")

class QueryResponse(BaseModel):
    answer: str
    reasoning: str  # NEW: LLM reasoning/thinking process
    entities: Dict[str, Any]
    sources: List[Dict[str, Any]]
    processing_time_ms: int

class DocumentInfo(BaseModel):
    document_id: str
    filename: str
    chunk_count: int
    indexed_at: Optional[str] = None

class DocumentListResponse(BaseModel):
    documents: List[DocumentInfo]
    total: int

class UploadResponse(BaseModel):
    document_id: str
    filename: str
    status: str
    chunks_created: int
    message: str

class HealthResponse(BaseModel):
    status: str
    message: str

class StatsResponse(BaseModel):
    total_documents: int
    total_chunks: int
    vector_db_size_mb: float


# ============================================
# Helper Functions
# ============================================

def get_hash_mapping() -> Dict[str, str]:
    """Load hash to filename mapping"""
    mapping_file = "faiss_store/hash_to_filename.json"
    if os.path.exists(mapping_file):
        import json
        with open(mapping_file, 'r') as f:
            return json.load(f)
    return {}

def save_hash_mapping(mapping: Dict[str, str]):
    """Save hash to filename mapping"""
    import json
    os.makedirs("faiss_store", exist_ok=True)
    with open("faiss_store/hash_to_filename.json", 'w') as f:
        json.dump(mapping, f, indent=2)

def get_pdf_path_from_hash(pdf_hash: str) -> Optional[str]:
    """Get PDF path from hash"""
    mapping = get_hash_mapping()
    filename = mapping.get(pdf_hash)
    if filename:
        path = DATA_DIR / filename
        if path.exists():
            return str(path)
    return None


# ============================================
# API Endpoints
# ============================================

@app.get("/", tags=["Root"])
async def root():
    """API root endpoint"""
    return {
        "message": "Campus Sathi RAG API",
        "version": "1.0.0",
        "docs": "/docs",
        "endpoints": {
            "upload": "POST /api/documents/upload",
            "list": "GET /api/documents",
            "query": "POST /api/query",
            "health": "GET /api/health",
            "stats": "GET /api/stats"
        }
    }

@app.get("/api/health", response_model=HealthResponse, tags=["Health"])
async def health_check():
    """Health check endpoint"""
    try:
        # Check if vector DB can be initialized
        vdb = get_vdb()
        return HealthResponse(
            status="healthy",
            message="API is running and vector DB is accessible"
        )
    except Exception as e:
        raise HTTPException(status_code=503, detail=f"Service unhealthy: {str(e)}")

@app.get("/api/stats", response_model=StatsResponse, tags=["Health"])
async def get_stats():
    """Get system statistics"""
    try:
        vdb = get_vdb()
        sources = vdb.get_all_sources()
        
        total_docs = len(sources)
        total_chunks = sum(s["chunk_count"] for s in sources)
        
        # Calculate vector DB size
        db_size = 0
        faiss_dir = Path("faiss_store")
        if faiss_dir.exists():
            for file in faiss_dir.glob("*"):
                if file.is_file():
                    db_size += file.stat().st_size
        
        return StatsResponse(
            total_documents=total_docs,
            total_chunks=total_chunks,
            vector_db_size_mb=round(db_size / (1024 * 1024), 2)
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to get stats: {str(e)}")

@app.post("/api/documents/upload", response_model=UploadResponse, tags=["Documents"])
async def upload_document(file: UploadFile = File(...)):
    """
    Upload and index a PDF document.
    """
    # Validate file type
    if not file.filename.lower().endswith('.pdf'):
        raise HTTPException(status_code=400, detail="Only PDF files are supported")
    
    try:
        # Save uploaded file
        file_path = DATA_DIR / file.filename
        
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
        
        # Get file hash
        pdf_hash = get_file_hash(str(file_path))
        
        # Check if already indexed
        vdb = get_vdb()
        if vdb.check_processed(pdf_hash):
            return UploadResponse(
                document_id=pdf_hash,
                filename=file.filename,
                status="already_indexed",
                chunks_created=0,
                message="Document was already indexed"
            )
        
        # Index the document
        run_rag_pipeline(str(file_path), query="", top_k=1)
        
        # Update hash mapping
        mapping = get_hash_mapping()
        mapping[pdf_hash] = file.filename
        save_hash_mapping(mapping)
        
        # Get chunk count
        sources = vdb.get_all_sources()
        chunks = next((s["chunk_count"] for s in sources if s["source_hash"] == pdf_hash), 0)
        
        return UploadResponse(
            document_id=pdf_hash,
            filename=file.filename,
            status="indexed",
            chunks_created=chunks,
            message="Document successfully indexed"
        )
        
    except Exception as e:
        # Clean up file if indexing failed
        if file_path.exists():
            file_path.unlink()
        raise HTTPException(status_code=500, detail=f"Failed to index document: {str(e)}")

@app.get("/api/documents", response_model=DocumentListResponse, tags=["Documents"])
async def list_documents():
    """
    List all indexed documents.
    """
    try:
        vdb = get_vdb()
        sources = vdb.get_all_sources()
        mapping = get_hash_mapping()
        
        documents = []
        for source in sources:
            pdf_hash = source["source_hash"]
            filename = mapping.get(pdf_hash, f"Unknown_{pdf_hash[:8]}")
            
            documents.append(DocumentInfo(
                document_id=pdf_hash,
                filename=filename,
                chunk_count=source["chunk_count"],
                indexed_at=None  # Could add timestamp to metadata if needed
            ))
        
        return DocumentListResponse(
            documents=documents,
            total=len(documents)
        )
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to list documents: {str(e)}")

@app.delete("/api/documents/{document_id}", tags=["Documents"])
async def delete_document(document_id: str):
    """
    Delete a document from the index and filesystem.
    """
    try:
        vdb = get_vdb()
        
        # Check if document exists
        if not vdb.check_processed(document_id):
            raise HTTPException(status_code=404, detail="Document not found")
        
        # Delete from vector DB
        vdb.delete_source(document_id)
        
        # Delete file from disk
        mapping = get_hash_mapping()
        filename = mapping.get(document_id)
        if filename:
            file_path = DATA_DIR / filename
            if file_path.exists():
                file_path.unlink()
            
            # Update mapping
            del mapping[document_id]
            save_hash_mapping(mapping)
        
        return {
            "message": "Document deleted successfully",
            "document_id": document_id
        }
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to delete document: {str(e)}")

@app.post("/api/query", response_model=QueryResponse, tags=["Query"])
async def query_documents(request: QueryRequest):
    """
    Ask questions about indexed documents.
    """
    start_time = time.time()
    
    try:
        # Extract entities from query
        entities = extract_entities_llm(request.query)
        
        # Build filters
        filters = {}
        if request.document_id:
            # Verify document exists
            vdb = get_vdb()
            if not vdb.check_processed(request.document_id):
                raise HTTPException(status_code=404, detail="Document not found")
            filters["source_hash"] = request.document_id
        
        # NOTE: Intent filtering removed since we removed intent from chunks
        # if "_intent" in entities:
        #     filters["intent"] = entities["_intent"]
        
        # Retrieve more chunks initially for better optimization
        vdb = get_vdb()
        initial_top_k = min(request.top_k * 4, 20)
        results = vdb.query(request.query, n_results=initial_top_k, where_filter=filters)
        
        if not results:
            raise HTTPException(
                status_code=404,
                detail="No relevant information found in the indexed documents"
            )
        
        # *** OPTIMIZATION PIPELINE ***
        results = optimize_chunks(
            chunks=results,
            entities=entities,
            max_tokens=2500,
            max_per_page=3
        )
        
        if not results:
            raise HTTPException(
                status_code=404,
                detail="No relevant chunks found after optimization"
            )
        
        # Generate reasoning (NEW)
        from Answer import generate_reasoning
        reasoning = generate_reasoning(request.query, entities, results)
        
        # Build context with row filtering
        context = build_context(results, entities=entities)
        
        if not context.strip():
            raise HTTPException(
                status_code=404,
                detail="No relevant information found after filtering"
            )
        
        # Generate answer
        answer = generate_answer(request.query, context)
        
        # Prepare source information
        sources = []
        mapping = get_hash_mapping()
        for result in results[:5]:
            sources.append({
                "page": result.get("page", "N/A"),
                "chunk_type": result.get("chunk_type", "unknown"),
                "document": mapping.get(result.get("source_hash", ""), "Unknown"),
                "relevance_score": round(result.get("distance", 0), 3)
            })
        
        processing_time = int((time.time() - start_time) * 1000)
        
        return QueryResponse(
            answer=answer,
            reasoning=reasoning,  # NEW
            entities=entities,
            sources=sources,
            processing_time_ms=processing_time
        )
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Query failed: {str(e)}")


# ============================================
# Run Application
# ============================================

if __name__ == "__main__":
    import uvicorn
    
    print("=" * 60)
    print("Campus Sathi API Server")
    print("=" * 60)
    print("Starting server at http://localhost:8000")
    print("API Documentation: http://localhost:8000/docs")
    print("=" * 60)
    
    uvicorn.run(
        "app:app",
        host="0.0.0.0",
        port=8000,
        reload=True,  # Auto-reload on code changes
        log_level="info"
    )
