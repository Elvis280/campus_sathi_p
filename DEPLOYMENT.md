# Deploying Campus Sathi on Render

Complete guide to deploy your Campus Sathi application on Render (both backend and frontend).

## 🎯 Overview

We'll deploy:
1. **Backend** - FastAPI Python server (Web Service)
2. **Frontend** - React app (Static Site)

Total cost: **$0** (Free tier)

---

## 📋 Prerequisites

- [x] GitHub account
- [x] Render account ([Sign up free](https://render.com))
- [x] Groq API key
- [x] Code pushed to GitHub repository

---

## 🚀 Step 1: Prepare Your Repository

### 1.1 Create Build Script for Backend

Already done! Your `Backend/requirements.txt` exists.

### 1.2 Update CORS for Production

Edit `Backend/app.py` around line 25-35:

```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:8080",
        "https://*.onrender.com",  # Add this for Render frontend
        "https://your-custom-domain.com"  # Add your custom domain if you have one
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

### 1.3 Push to GitHub

```bash
git add .
git commit -m "Prepare for Render deployment"
git push origin main
```

---

## 🔧 Step 2: Deploy Backend

### 2.1 Create Web Service

1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repository
4. Select your `doc-analysis` repository

### 2.2 Configure Backend Service

Fill in the following:

| Field | Value |
|-------|-------|
| **Name** | `campus-sathi-backend` |
| **Region** | Choose closest to you |
| **Branch** | `main` |
| **Root Directory** | `Backend` |
| **Runtime** | `Python 3` |
| **Build Command** | `pip install -r requirements.txt` |
| **Start Command** | `uvicorn app:app --host 0.0.0.0 --port $PORT` |
| **Instance Type** | `Free` |

### 2.3 Add Environment Variables

Click **"Advanced"** → **"Add Environment Variable"**:

| Key | Value |
|-----|-------|
| `GROQ_API_KEY` | Your Groq API key |
| `PYTHON_VERSION` | `3.10.0` (optional, ensures correct version) |

### 2.4 Deploy

1. Click **"Create Web Service"**
2. Wait 5-10 minutes for deployment
3. Your backend will be at: `https://campus-sathi-backend.onrender.com`
4. Test it: `https://campus-sathi-backend.onrender.com/api/health`

**Important:** Write down your backend URL! You'll need it for the frontend.

---

## 🎨 Step 3: Deploy Frontend

### 3.1 Update Frontend Environment

Edit `Frontend/.env` (or create `.env.production`):

```env
VITE_API_URL=https://campus-sathi-backend.onrender.com
```

**Commit and push:**
```bash
git add Frontend/.env
git commit -m "Update API URL for production"
git push origin main
```

### 3.2 Create Static Site

1. Go to Render Dashboard
2. Click **"New +"** → **"Static Site"**
3. Connect same GitHub repository

### 3.3 Configure Frontend Service

| Field | Value |
|-------|-------|
| **Name** | `campus-sathi-frontend` |
| **Branch** | `main` |
| **Root Directory** | `Frontend` |
| **Build Command** | `npm install && npm run build` |
| **Publish Directory** | `Frontend/dist` |

### 3.4 Add Environment Variable

Click **"Advanced"** → **"Add Environment Variable"**:

| Key | Value |
|-----|-------|
| `VITE_API_URL` | `https://campus-sathi-backend.onrender.com` |

### 3.5 Deploy

1. Click **"Create Static Site"**
2. Wait 5-10 minutes for build
3. Your app will be at: `https://campus-sathi-frontend.onrender.com`

---

## ✅ Step 4: Verify Deployment

### 4.1 Test Backend

Open: `https://campus-sathi-backend.onrender.com/docs`

You should see the FastAPI Swagger UI.

Try these endpoints:
- `/api/health` - Should return `{"status": "healthy"}`
- `/api/documents` - Should return `{"documents": []}`

### 4.2 Test Frontend

1. Open: `https://campus-sathi-frontend.onrender.com`
2. Select **Student Portal** or **Admin Portal**
3. Try uploading a PDF (Admin Portal)
4. Try asking a question (Student Portal)

### 4.3 Check Browser Console

Press `F12` and check for errors. Common issues:
- CORS errors → Update backend CORS settings
- API connection errors → Check `VITE_API_URL` is correct

---

## 🔄 Step 5: Enable Auto-Deploy

Both services should auto-deploy when you push to GitHub.

To verify:
1. Go to Service Settings
2. Check **"Auto-Deploy"** is enabled
3. Make a small change and push
4. Watch deployment in Render dashboard

---

## 🎨 Step 6: Custom Domain (Optional)

### For Frontend:

1. Go to your Static Site settings
2. Click **"Custom Domains"**
3. Click **"Add Custom Domain"**
4. Enter your domain (e.g., `campussathi.com`)
5. Add DNS records as shown by Render:
   ```
   Type: CNAME
   Name: www (or @)
   Value: campus-sathi-frontend.onrender.com
   ```

### For Backend:

1. Go to your Web Service settings
2. Click **"Custom Domains"**
3. Add `api.campussathi.com`
4. Update frontend `.env`:
   ```env
   VITE_API_URL=https://api.campussathi.com
   ```

---

## 🐛 Troubleshooting

### Backend Issues

**"Application failed to start"**
- Check logs in Render dashboard
- Verify `Start Command` is correct
- Check `GROQ_API_KEY` is set

**"Module not found" errors**
- Ensure all dependencies in `requirements.txt`
- Check Python version is 3.10+

**CORS errors**
- Update `allow_origins` in `app.py`
- Include your frontend URL

### Frontend Issues

**"Failed to fetch" errors**
- Check `VITE_API_URL` environment variable
- Verify backend is running
- Check browser console for exact error

**Build fails**
- Check `package.json` has all dependencies
- Verify `Build Command` is correct
- Check Node version compatibility

**Blank page**
- Check browser console for errors
- Verify `Publish Directory` is `Frontend/dist`
- Check build completed successfully

### Free Tier Limitations

**Backend sleeping:**
- Free tier sleeps after 15 minutes of inactivity
- First request after sleep takes ~30 seconds (cold start)
- Upgrade to paid tier ($7/month) for always-on

**Solution for cold starts:**
- Use a ping service (e.g., UptimeRobot) to keep it awake
- Or accept the cold start on free tier

---

## 📊 Monitoring

### View Logs

**Backend:**
1. Go to Web Service
2. Click **"Logs"** tab
3. See real-time Python logs

**Frontend:**
1. Go to Static Site
2. Click **"Logs"** tab  
3. See build logs

### Metrics

Both services show:
- Request count
- Response times
- Error rates

---

## 💰 Costs

| Service | Free Tier | Paid Tier |
|---------|-----------|-----------|
| Backend (Web Service) | ✅ 750 hrs/month | $7/month (always on) |
| Frontend (Static Site) | ✅ 100GB bandwidth | $1/month per 100GB extra |
| **Total** | **$0** | **$7-8/month** |

Free tier is perfect for:
- Personal projects
- Demos
- Low traffic apps

Upgrade when:
- You need always-on backend
- Traffic exceeds 100GB/month
- You want custom domains with SSL

---

## 🚀 Going Live Checklist

- [ ] Backend deployed and accessible
- [ ] Frontend deployed and accessible
- [ ] Environment variables set correctly
- [ ] CORS configured for production URLs
- [ ] Test upload PDF works
- [ ] Test querying works
- [ ] Check error handling works
- [ ] Monitor logs for issues
- [ ] (Optional) Set up custom domain
- [ ] (Optional) Set up analytics
- [ ] Share your app! 🎉

---

## 📝 Quick Commands Reference

```bash
# Push updates
git add .
git commit -m "Update message"
git push origin main
# Render auto-deploys!

# View backend logs
# Go to: https://dashboard.render.com → Your Service → Logs

# Manually trigger redeploy
# Go to: Service → Manual Deploy → Deploy latest commit
```

---

## 🎯 Next Steps

After successful deployment:

1. **Test thoroughly** - Upload PDFs, ask questions
2. **Monitor usage** - Check Render dashboard for resource usage
3. **Set up alerts** - Get notified of deployment failures
4. **Share with users** - Your app is now live!
5. **Gather feedback** - Improve based on real usage

---

**Your deployment URLs:**
- Backend: `https://campus-sathi-backend.onrender.com`
- Frontend: `https://campus-sathi-frontend.onrender.com`
- API Docs: `https://campus-sathi-backend.onrender.com/docs`

**Questions?** Check Render docs: https://render.com/docs

---

**🎉 Congratulations! Your Campus Sathi is now live on the internet!**
