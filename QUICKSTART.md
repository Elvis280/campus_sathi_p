# 🚀 Quick Start Guide - Campus Sathi

## Get Started in 3 Steps

### Step 1: Start the Backend

```bash
cd Backend
python app.py
```

✅ Backend will start at `http://localhost:8000`  
📖 API docs available at `http://localhost:8000/docs`

### Step 2: Start the Frontend

Open a new terminal:

```bash
cd Frontend
npm install  # First time only
npm run dev
```

✅ Frontend will start at `http://localhost:5173`

### Step 3: Use the Application

1. **Open your browser** → `http://localhost:5173`
2. **Login** using the credentials (or create an account)
3. **Navigate to User Dashboard**
4. **Upload a PDF** using the upload button (file icon)
5. **Ask questions** about your documents!

## Example Queries to Try

After uploading academic PDFs, try asking:

- "When is the exam for Computer Networks?"
- "What are the marks for roll number 101?"
- "Show me the examination schedule"
- "What subjects are scheduled for January 25th?"
- "List all exams in chronological order"

## Features Available

### ✨ Smart Question Answering
- Natural language query processing
- Context-aware responses
- Entity extraction (dates, roll numbers, subjects)
- Source attribution

### 📄 Document Management
- Upload PDF files (exam notices, schedules, etc.)
- Automatic text and table extraction
- Intelligent chunking and indexing
- Vector-based semantic search

### 🔍 Response Details
- **Answer**: Direct answer to your question
- **Reasoning**: See how the AI thought through the problem (expandable)
- **Sources**: View which documents were used
- **Processing Time**: See how long it took to generate the response

## Troubleshooting

### Backend won't start?
- Make sure Python is installed
- Install requirements: `pip install -r requirements.txt`
- Check for port conflicts (8000)

### Frontend won't start?
- Make sure Node.js is installed (v16+)
- Delete `node_modules` and `package-lock.json`
- Run `npm install` again

### "No documents found" error?
- Upload at least one PDF document first
- Wait for the indexing to complete (check backend logs)
- Try refreshing the page

### Connection refused errors?
- Verify backend is running at `http://localhost:8000`
- Check the `.env` file in Frontend directory
- Make sure `VITE_API_URL=http://localhost:8000`

## File Structure

```
Campus sathi/
├── Backend/
│   ├── app.py              # FastAPI server (DO NOT MODIFY)
│   ├── Answer.py           # Query answering logic
│   ├── Retrieval.py        # Vector search
│   ├── VectorStore.py      # FAISS database
│   └── data/               # Uploaded PDFs stored here
│
├── Frontend/
│   ├── src/
│   │   ├── lib/
│   │   │   └── api.ts      # ✨ NEW: Backend API service
│   │   ├── pages/
│   │   │   └── UserDashboard.tsx  # ✨ UPDATED: Connected to backend
│   │   └── ...
│   ├── .env                # ✨ NEW: API configuration
│   └── .env.example        # ✨ NEW: Template
│
├── INTEGRATION.md          # ✨ NEW: Detailed integration docs
└── QUICKSTART.md          # ✨ NEW: This file!
```

## What Changed?

### Files Created
1. `Frontend/src/lib/api.ts` - API service for backend communication
2. `Frontend/.env` - Environment configuration
3. `Frontend/.env.example` - Environment template
4. `INTEGRATION.md` - Detailed integration guide
5. `QUICKSTART.md` - This quick start guide

### Files Modified
1. `Frontend/src/pages/UserDashboard.tsx` - Connected to real backend
2. `Frontend/src/vite-env.d.ts` - Added env type definitions
3. `Frontend/.gitignore` - Added .env files

### Backend
✅ **No changes made** (as requested)

## Next Actions

1. **Test the connection** by uploading a PDF
2. **Ask some questions** about the uploaded documents
3. **Explore the UI** - check out reasoning and sources
4. **Read INTEGRATION.md** for more details

## Need Help?

- **Integration Details**: See `INTEGRATION.md`
- **Backend API**: Visit `http://localhost:8000/docs`
- **Frontend Issues**: Check browser console for errors
- **Backend Issues**: Check terminal logs where `app.py` is running

---

**Status**: ✅ Frontend and Backend are fully connected!  
**Ready to use!** 🎉
