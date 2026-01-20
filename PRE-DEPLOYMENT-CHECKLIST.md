# 🚀 Pre-Deployment Checklist

Complete this checklist before deploying Campus Sathi to Render.

## ✅ Backend Preparation

### 1. Environment Variables
- [ ] You have a Groq API key ([Get one here](https://console.groq.com/keys))
- [ ] Backend `.env` file exists with `GROQ_API_KEY`
- [ ] `.env` is in `.gitignore` (already done ✅)

### 2. Code Updates
- [x] ✅ CORS updated to allow Render URLs (`https://*.onrender.com`)
- [x] ✅ CORS includes localhost for development
- [ ] Test backend locally: `cd Backend && python app.py`
- [ ] Verify `/api/health` endpoint works

### 3. Dependencies
- [x] ✅ `requirements.txt` is complete and up to date
- [ ] Test installation: `pip install -r Backend/requirements.txt`

## ✅ Frontend Preparation

### 1. Environment Configuration
- [x] ✅ `.env.production` created with backend URL template
- [ ] Update `.env.production` after backend deployment
- [ ] `.env` files are in `.gitignore` (already done ✅)

### 2. Code Updates
- [ ] Test frontend locally: `cd Frontend && npm run dev`
- [ ] Test build succeeds: `npm run build`
- [ ] Verify connection to local backend works

### 3. Dependencies
- [x] ✅ `package.json` is complete
- [ ] Test installation: `npm install` (should have no errors)

## ✅ Git Repository

### 1. Clean Commit
- [ ] All changes committed
- [ ] No sensitive data in commits (check `git log`)
- [ ] `.env` files NOT committed (gitignored)

### 2. Push to GitHub
```bash
git status                     # Check what will be committed
git add .                      # Stage all changes
git commit -m "Prepare for Render deployment"
git push origin main           # Push to GitHub
```

## ✅ Quick Test Before Deploy

### Backend Test
```bash
cd Backend
python app.py
# Open http://localhost:8000/docs
# Try /api/health endpoint
```

### Frontend Test
```bash
cd Frontend
npm run dev
# Open http://localhost:5173
# Try selecting a role
```

## 📝 Files Modified/Created

### ✅ Already Done:
- [x] `Backend/app.py` - CORS updated for production
- [x] `Frontend/.env.production` - Production environment template
- [x] `Backend/.env.example` - Environment variable template
- [x] `.gitignore` - Protects sensitive files
- [x] `render.yaml` - Automated deployment config
- [x] `DEPLOYMENT.md` - Full deployment guide

### ⚠️ You Need to Do:
- [ ] Create `Backend/.env` with your actual Groq API key
- [ ] Test everything works locally
- [ ] Push to GitHub

## 🚀 Ready to Deploy?

Once all checkboxes are ✅, you're ready!

**Next steps:**
1. Follow `DEPLOYMENT.md` for detailed Render setup
2. Deploy backend first, get the URL
3. Update `Frontend/.env.production` with backend URL
4. Deploy frontend

## 🔑 Important URLs to Keep

After deployment, save these URLs:

```
Backend: https://campus-sathi-backend.onrender.com
Frontend: https://campus-sathi-frontend.onrender.com
API Docs: https://campus-sathi-backend.onrender.com/docs
```

## ⚡ Quick Commands

### Commit and Push
```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

### Test Backend
```bash
cd Backend
python app.py
```

### Test Frontend
```bash
cd Frontend
npm run dev
```

### Build Frontend
```bash
cd Frontend
npm run build
```

---

**All set?** → Open `DEPLOYMENT.md` and start deploying! 🚀
