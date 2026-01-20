# 🎓 Campus Sathi - AI-Powered Document Q&A System

> An intelligent RAG (Retrieval-Augmented Generation) system that helps students and administrators query academic documents using natural language.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Python 3.10+](https://img.shields.io/badge/python-3.10+-blue.svg)](https://www.python.org/downloads/)
[![React](https://img.shields.io/badge/React-18.3-blue)](https://reactjs.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-Latest-green)](https://fastapi.tiangolo.com/)

## ✨ Features

- 🤖 **AI-Powered Q&A** - Ask questions in natural language and get accurate answers from your documents
- 📄 **PDF Processing** - Automatic OCR and intelligent text extraction from academic PDFs
- 🔍 **Semantic Search** - FAISS-powered vector search with Nomic embeddings for superior relevance
- 🎯 **Smart Entity Detection** - Automatically identifies roll numbers, dates, subjects, and other entities
- 📊 **Table Understanding** - Advanced table extraction with range-based filtering
- 🛡️ **Role-Based Access** - Separate Student and Admin portals with different capabilities
- 💬 **Modern Chat Interface** - Clean, responsive UI with collapsible reasoning and sources
- ⚡ **Fast Responses** - Groq LLM integration for lightning-fast answer generation

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────┐
│          React Frontend (TypeScript)            │
│          - Student Portal (Query Only)          │
│          - Admin Portal (Upload & Manage)       │
└────────────────┬────────────────────────────────┘
                 │ REST API
┌────────────────▼────────────────────────────────┐
│          FastAPI Backend (Python)               │
│  ┌───────────┬──────────┬────────────────────┐ │
│  │  Extract  │  Clean   │  Embed & Store    │ │
│  │ (OCR/PDF) │ (Chunk)  │ (FAISS + Nomic)   │ │
│  └───────────┴──────────┴────────────────────┘ │
│  ┌──────────────────────────────────────────┐  │
│  │         Retrieval & Answer               │  │
│  │    (Vector Search + Groq LLM)            │  │
│  └──────────────────────────────────────────┘  │
└─────────────────────────────────────────────────┘
```

## 🚀 Quick Start

### Prerequisites

- Python 3.10 or higher
- Node.js 18+ (for frontend)
- Groq API Key ([Get one for free](https://console.groq.com/keys))

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/Elvis280/doc-analysis.git
cd doc-analysis
```

2. **Setup Backend**
```bash
cd Backend
python -m venv env
# Windows
.\env\Scripts\activate
# Mac/Linux
source env/bin/activate

pip install -r requirements.txt
cp .env.example .env
# Edit .env and add your GROQ_API_KEY
```

3. **Setup Frontend**
```bash
cd ../Frontend
npm install
cp .env.example .env
# Edit .env if needed (default: http://localhost:8000)
```

4. **Run the Application**

**Terminal 1 - Backend:**
```bash
cd Backend
python app.py
```
Server will start at `http://localhost:8000`  
API docs at `http://localhost:8000/docs`

**Terminal 2 - Frontend:**
```bash
cd Frontend
npm run dev
```
App will start at `http://localhost:5173` (or `http://localhost:8080`)

5. **Access the Application**
   - Open `http://localhost:5173` in your browser
   - Choose **Student Portal** or **Admin Portal**
   - No login required!

## 📖 Usage

### Admin Portal

1. **Upload Documents**
   - Click "Upload New Document" button
   - Select PDF files (exam schedules, notices, syllabi, etc.)
   - Wait for automatic indexing

2. **Manage Documents**
   - View all indexed PDFs
   - See chunk counts and document IDs
   - Delete documents when needed

### Student Portal

1. **Select Document**
   - Choose a document from the dropdown in the sidebar
   - Or select "All Documents" to query across everything

2. **Ask Questions**
   - Type your question naturally
   - Examples:
     - "When is the DBMS exam?"
     - "What exams are on 15th January?"
     - "Show schedule for roll number 2301025"
   - Or click example questions in the sidebar

3. **View Responses**
   - Read the AI-generated answer
   - Click "View Reasoning Process" to see how AI thinks
   - Click "View Sources" to see referenced documents with page numbers

## 📁 Project Structure

```
Campus-Sathi/
├── Backend/                 # Python FastAPI server
│   ├── app.py              # Main API server
│   ├── Answer.py           # LLM answer generation
│   ├── Retrieval.py        # Query pipeline
│   ├── Extract.py          # PDF OCR & extraction
│   ├── Clean.py            # Text chunking
│   ├── VectorStore.py      # FAISS vector database
│   ├── Embeddings.py       # Nomic embedding wrapper
│   ├── Normal.py           # Text normalization
│   ├── data/               # Uploaded PDFs (gitignored)
│   └── tests/              # Test scripts
│
├── Frontend/               # React TypeScript app
│   ├── src/
│   │   ├── pages/         # Dashboard components
│   │   ├── components/    # Reusable UI components
│   │   ├── contexts/      # Auth & Data contexts
│   │   ├── lib/           # API client & utilities
│   │   └── App.tsx        # Main app component
│   ├── public/            # Static assets
│   └── index.html         # Entry point
│
├── .gitignore             # Git ignore rules
├── README.md              # This file
├── QUICKSTART.md          # Quick setup guide
└── INTEGRATION.md         # Technical integration docs
```

## 🔧 Configuration

### Backend Settings

**Environment Variables** (`.env`):
```env
GROQ_API_KEY=your_api_key_here
```

**Default Configuration**:
- Max Context Tokens: 2500
- Chunk Size: 1000 characters
- Chunk Overlap: 200 characters
- Top K Results: 5
- LLM Model: llama-3.3-70b-versatile
- Temperature: 0.2 (factual answers)

### Frontend Settings

**Environment Variables** (`.env`):
```env
VITE_API_URL=http://localhost:8000
```

## 🛠️ Development

### Running Tests

```bash
cd Backend/tests
python test_chunks.py           # Inspect vector store
python reindex.py               # Re-index all PDFs
```

### API Documentation

Visit `http://localhost:8000/docs` for interactive Swagger UI documentation of all API endpoints.

### Key Endpoints

- `POST /api/query` - Query documents
- `POST /api/documents/upload` - Upload PDF
- `GET /api/documents` - List indexed documents
- `DELETE /api/documents/{id}` - Delete document
- `GET /api/health` - Health check
- `GET /api/stats` - System statistics

## 📚 Documentation

- **[QUICKSTART.md](./QUICKSTART.md)** - Quick 3-step setup guide
- **[INTEGRATION.md](./INTEGRATION.md)** - Technical integration details
- **[Backend README](./Backend/README.md)** - Backend-specific documentation
- **[Frontend README](./Frontend/README.md)** - Frontend-specific documentation

## 🐛 Troubleshooting

**Backend won't start?**
- Check Python version: `python --version` (must be 3.10+)
- Verify API key is set in `Backend/.env`
- Install dependencies: `pip install -r Backend/requirements.txt`

**Frontend not connecting?**
- Ensure backend is running on port 8000
- Check `Frontend/.env` has correct `VITE_API_URL`
- Clear browser cache and reload

**No documents showing?**
- Upload a PDF via Admin Portal
- Check `Backend/data/` folder has PDFs
- Check backend logs for indexing errors

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **[Nomic AI](https://www.nomic.ai/)** - Powerful embedding models
- **[Groq](https://groq.com/)** - Blazing fast LLM inference
- **[FAISS](https://github.com/facebookresearch/faiss)** - Efficient vector search
- **[FastAPI](https://fastapi.tiangolo.com/)** - Modern Python web framework
- **[React](https://react.dev/)** - UI library
- **[Tailwind CSS](https://tailwindcss.com/)** - Styling framework

## 📧 Contact

- **Repository**: [https://github.com/Elvis280/doc-analysis](https://github.com/Elvis280/doc-analysis)
- **Issues**: [https://github.com/Elvis280/doc-analysis/issues](https://github.com/Elvis280/doc-analysis/issues)

---

**Built with ❤️ for academic institutions**

*Making campus information accessible through AI*
