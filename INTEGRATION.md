# Campus Sathi - Frontend ↔ Backend Integration Guide

## Overview
The Campus Sathi frontend (React + TypeScript) is now connected to the FastAPI backend to provide a fully functional RAG-based document Q&A system.

## Backend Connection Status ✅

### API Service Layer
- **Location**: `src/lib/api.ts`
- **Base URL**: Configured via `.env` file (default: `http://localhost:8000`)
- **Functions**:
  - `queryDocuments(request)` - Ask questions about indexed documents
  - `uploadDocument(file)` - Upload and index PDF documents
  - `listDocuments()` - Get all indexed documents
  - `deleteDocument(id)` - Remove a document from the index
  - `healthCheck()` - Check if backend is running
  - `getStats()` - Get system statistics

### Integrated Components

#### UserDashboard (`src/pages/UserDashboard.tsx`)
The main chat interface now connects to the backend:

**Features:**
1. **Real-time Query Processing**
   - Sends user queries to backend `/api/query` endpoint
   - Displays AI-generated answers from the RAG system
   - Shows processing time in milliseconds

2. **Enhanced Response Display**
   - **Answer**: Main response from the LLM
   - **Reasoning** (collapsible): Shows the LLM's thinking process
   - **Sources**: Lists document sources with:
     - Document name
     - Page number
     - Chunk type
     - Relevance score (as percentage)
   - **Processing Time**: Response generation time in ms

3. **Document Upload**
   - Upload PDF files via the "Neural Sync" button
   - Real-time upload progress and status notifications
   - Automatic validation (PDF files only)
   - Shows number of chunks created after indexing

4. **Error Handling**
   - Graceful error messages for backend issues
   - Clear user notifications via toast messages
   - Helpful error context (e.g., "ensure backend is running")

## Setup Instructions

### 1. Configure Environment Variables

Create a `.env` file in the Frontend directory:

```env
VITE_API_URL=http://localhost:8000
```

### 2. Install Dependencies

```bash
cd Frontend
npm install
```

### 3. Start the Backend Server

In a separate terminal:

```bash
cd Backend
python app.py
```

The backend should start at `http://localhost:8000`

### 4. Start the Frontend Development Server

```bash
cd Frontend
npm run dev
```

The frontend will start at `http://localhost:5173` (or similar)

### 5. Upload Documents

1. Log in to the application
2. Navigate to the User Dashboard
3. Click the "Neural Sync" (upload) button
4. Select a PDF file to upload
5. Wait for the indexing to complete

### 6. Ask Questions

1. Type your question in the chat input
2. Press Enter or click "SEND"
3. Wait for the AI response
4. Expand "View Reasoning Process" to see how the AI thought through the answer
5. Review the Sources section to see which documents were referenced

## API Response Structure

### Query Response
```typescript
{
  answer: string;              // AI-generated answer
  reasoning: string;           // LLM's reasoning process
  entities: {                  // Extracted entities from query
    roll_number?: string;
    date?: string;
    amount?: number;
    // ... other entities
  };
  sources: Array<{             // Source documents
    page: string | number;
    chunk_type: string;
    document: string;
    relevance_score: number;   // 0-1 similarity score
  }>;
  processing_time_ms: number;  // Response time
}
```

### Upload Response
```typescript
{
  document_id: string;         // Unique hash identifier
  filename: string;            // Original filename
  status: string;              // "indexed" or "already_indexed"
  chunks_created: number;      // Number of chunks created
  message: string;             // Status message
}
```

## UI/UX Features

### Visual Indicators
- **Loading State**: Animated dots while AI is processing
- **Toast Notifications**: Real-time feedback for all operations
- **Collapsible Sections**: Reasoning can be expanded/collapsed
- **Source Cards**: Clean display of document references
- **Processing Time**: Shows response speed

### Error States
- Connection failures show helpful error messages
- Missing documents trigger appropriate warnings
- Invalid file types are rejected with clear messaging

## Architecture

```
Frontend (React)
    ↓
src/lib/api.ts (API Service Layer)
    ↓
HTTP Requests
    ↓
Backend (FastAPI at localhost:8000)
    ↓
RAG Pipeline (Retrieval.py, Answer.py)
    ↓
Vector Database (FAISS)
```

## Troubleshooting

### Backend Not Responding
1. Ensure backend is running: `python Backend/app.py`
2. Check backend URL in `.env` matches actual backend address
3. Verify CORS is enabled in backend (already configured)

### No Documents Found
1. Upload at least one PDF document first
2. Wait for indexing to complete
3. Verify document appears in backend logs

### Slow Responses
- Processing time depends on:
  - Document count
  - Query complexity
  - System resources
  - Model size (Gemini API)

## Development Notes

- The backend serves at `http://0.0.0.0:8000` by default
- Frontend uses Vite for fast development builds
- All API calls use `async/await` for clean async handling
- TypeScript provides full type safety for API responses
- No backend modifications were made (as requested)

## Next Steps (Optional Enhancements)

1. Add document management UI (list, delete documents)
2. Show system stats in dashboard header
3. Add query history/conversation persistence
4. Implement advanced filters UI
5. Add dark/light theme toggle for chat
6. Export conversation as PDF/text

---

**Status**: ✅ Backend successfully connected to frontend
**Last Updated**: 2026-01-20
