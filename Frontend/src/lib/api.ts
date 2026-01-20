/**
 * API service for Campus Sathi Backend
 * Connects frontend to FastAPI backend endpoints
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export interface QueryRequest {
    query: string;
    document_id?: string;
    top_k?: number;
}

export interface QueryResponse {
    answer: string;
    reasoning: string;
    entities: Record<string, any>;
    sources: Array<{
        page: string | number;
        chunk_type: string;
        document: string;
        relevance_score: number;
    }>;
    processing_time_ms: number;
}

export interface DocumentInfo {
    document_id: string;
    filename: string;
    chunk_count: number;
    indexed_at?: string;
}

export interface UploadResponse {
    document_id: string;
    filename: string;
    status: string;
    chunks_created: number;
    message: string;
}

export interface HealthResponse {
    status: string;
    message: string;
}

export interface StatsResponse {
    total_documents: number;
    total_chunks: number;
    vector_db_size_mb: number;
}

/**
 * Query the RAG system
 */
export async function queryDocuments(request: QueryRequest): Promise<QueryResponse> {
    const response = await fetch(`${API_BASE_URL}/api/query`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
    });

    if (!response.ok) {
        const error = await response.json().catch(() => ({ detail: 'Unknown error' }));
        throw new Error(error.detail || `Query failed: ${response.statusText}`);
    }

    return response.json();
}

/**
 * Upload a PDF document
 */
export async function uploadDocument(file: File): Promise<UploadResponse> {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(`${API_BASE_URL}/api/documents/upload`, {
        method: 'POST',
        body: formData,
    });

    if (!response.ok) {
        const error = await response.json().catch(() => ({ detail: 'Unknown error' }));
        throw new Error(error.detail || `Upload failed: ${response.statusText}`);
    }

    return response.json();
}

/**
 * List all indexed documents
 */
export async function listDocuments(): Promise<{ documents: DocumentInfo[]; total: number }> {
    const response = await fetch(`${API_BASE_URL}/api/documents`);

    if (!response.ok) {
        const error = await response.json().catch(() => ({ detail: 'Unknown error' }));
        throw new Error(error.detail || `Failed to list documents: ${response.statusText}`);
    }

    return response.json();
}

/**
 * Delete a document
 */
export async function deleteDocument(documentId: string): Promise<{ message: string; document_id: string }> {
    const response = await fetch(`${API_BASE_URL}/api/documents/${documentId}`, {
        method: 'DELETE',
    });

    if (!response.ok) {
        const error = await response.json().catch(() => ({ detail: 'Unknown error' }));
        throw new Error(error.detail || `Failed to delete document: ${response.statusText}`);
    }

    return response.json();
}

/**
 * Health check
 */
export async function healthCheck(): Promise<HealthResponse> {
    const response = await fetch(`${API_BASE_URL}/api/health`);

    if (!response.ok) {
        const error = await response.json().catch(() => ({ detail: 'Unknown error' }));
        throw new Error(error.detail || `Health check failed: ${response.statusText}`);
    }

    return response.json();
}

/**
 * Get system stats
 */
export async function getStats(): Promise<StatsResponse> {
    const response = await fetch(`${API_BASE_URL}/api/stats`);

    if (!response.ok) {
        const error = await response.json().catch(() => ({ detail: 'Unknown error' }));
        throw new Error(error.detail || `Failed to get stats: ${response.statusText}`);
    }

    return response.json();
}
