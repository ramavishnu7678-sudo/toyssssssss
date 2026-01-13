# 🚀 Deployment Guide - Kalaii Shop

This guide will help you deploy your e-commerce website to production.

## 📋 Prerequisites

1. **GitHub Account** - To host your code
2. **Vercel Account** - For frontend (Next.js) - FREE
3. **Railway/Render Account** - For backend (Express) - FREE tier available
4. **MongoDB Atlas** - Already set up ✅

---

## 🎯 Deployment Strategy

- **Frontend (Next.js)**: Deploy to **Vercel** (Best for Next.js, automatic deployments)
- **Backend (Express)**: Deploy to **Railway** or **Render** (Both have free tiers)

---

## 📦 Step 1: Prepare Your Code

### 1.1 Push to GitHub

```bash
# Initialize git if not already done
git init
git add .
git commit -m "Initial commit - Ready for deployment"

# Create a new repository on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/kalaii-shop.git
git branch -M main
git push -u origin main
```

---

## 🌐 Step 2: Deploy Frontend to Vercel

### 2.1 Create Vercel Account
1. Go to [vercel.com](https://vercel.com)
2. Sign up with GitHub
3. Click "New Project"

### 2.2 Import Your Repository
1. Select your `kalaii-shop` repository
2. Vercel will auto-detect Next.js
3. **Configure Environment Variables:**
   - Click "Environment Variables"
   - Add: `NEXT_PUBLIC_API_URL` = `https://your-backend-url.railway.app/api` (or render.com)
   - Example: `https://kalaii-shop-backend.railway.app/api`

### 2.3 Deploy
1. Click "Deploy"
2. Wait 2-3 minutes
3. **Your frontend URL will be**: `https://kalaii-shop.vercel.app` (or custom domain)

---

## 🔧 Step 3: Deploy Backend to Railway

### 3.1 Create Railway Account
1. Go to [railway.app](https://railway.app)
2. Sign up with GitHub
3. Click "New Project" → "Deploy from GitHub repo"

### 3.2 Configure Backend
1. Select your repository
2. Railway will auto-detect Node.js
3. **Set Environment Variables:**
   - `MONGODB_URI` = `mongodb+srv://ramavishnu7678_db_user:toyshop123@cluster0.sjfu5m1.mongodb.net/wondertoys?retryWrites=true&w=majority`
   - `JWT_SECRET` = `your-super-secret-jwt-key-change-this-in-production`
   - `JWT_EXPIRE` = `7d`
   - `PORT` = `5000` (Railway will auto-assign, but set this)
   - `NODE_ENV` = `production`
   - `FRONTEND_URL` = `https://your-vercel-url.vercel.app`

### 3.3 Deploy
1. Railway will automatically deploy
2. Get your backend URL: `https://kalaii-shop-backend.railway.app`
3. **Update Vercel environment variable** with this URL

---

## 🔧 Alternative: Deploy Backend to Render

### 3.1 Create Render Account
1. Go to [render.com](https://render.com)
2. Sign up with GitHub
3. Click "New" → "Web Service"

### 3.2 Configure Backend
1. Connect your GitHub repository
2. **Settings:**
   - **Name**: `kalaii-shop-backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `node server/index.js`
   - **Plan**: Free

3. **Environment Variables:**
   - `MONGODB_URI` = `mongodb+srv://ramavishnu7678_db_user:toyshop123@cluster0.sjfu5m1.mongodb.net/wondertoys?retryWrites=true&w=majority`
   - `JWT_SECRET` = `your-super-secret-jwt-key-change-this-in-production`
   - `JWT_EXPIRE` = `7d`
   - `NODE_ENV` = `production`
   - `FRONTEND_URL` = `https://your-vercel-url.vercel.app`

### 3.3 Deploy
1. Click "Create Web Service"
2. Wait 5-10 minutes for first deployment
3. Get your backend URL: `https://kalaii-shop-backend.onrender.com`

---

## ✅ Step 4: Final Configuration

### 4.1 Update Frontend Environment Variable
1. Go back to Vercel
2. Project Settings → Environment Variables
3. Update `NEXT_PUBLIC_API_URL` with your actual backend URL
4. Redeploy (or it will auto-redeploy)

### 4.2 Update Backend CORS
The backend is already configured to accept your frontend URL. Make sure `FRONTEND_URL` environment variable matches your Vercel URL.

### 4.3 Test Your Deployment
1. Visit your Vercel URL
2. Try logging in with: `ramavishnu7678@gmail.com`
3. Access admin panel at: `https://your-site.vercel.app/admin`

---

## 🔗 Your Live URLs

After deployment, you'll have:

- **Frontend**: `https://kalaii-shop.vercel.app`
- **Backend API**: `https://kalaii-shop-backend.railway.app/api` (or render.com)

---

## 🛠️ Troubleshooting

### Backend not connecting?
- Check environment variables are set correctly
- Verify MongoDB Atlas allows connections from anywhere (0.0.0.0/0)
- Check Railway/Render logs for errors

### Frontend can't reach backend?
- Verify `NEXT_PUBLIC_API_URL` is correct in Vercel
- Check CORS settings in backend
- Make sure backend URL doesn't have trailing slash

### Images not loading?
- Backend serves images from `/uploads` directory
- Make sure uploads folder exists on Railway/Render
- Consider using cloud storage (AWS S3, Cloudinary) for production

---

## 📝 Quick Deploy Commands

### Railway CLI (Optional)
```bash
npm i -g @railway/cli
railway login
railway init
railway up
```

### Vercel CLI (Optional)
```bash
npm i -g vercel
vercel login
vercel --prod
```

---

## 🎉 You're Done!

Your website is now live! Share your Vercel URL with others.

**Admin Access**: Only `ramavishnu7678@gmail.com` can access the admin panel.

---

## 💡 Pro Tips

1. **Custom Domain**: Add your domain in Vercel settings
2. **Auto-Deploy**: Both platforms auto-deploy on git push
3. **Monitoring**: Check logs in Railway/Render dashboard
4. **Backups**: MongoDB Atlas has automatic backups

---

## 📞 Need Help?

- Vercel Docs: https://vercel.com/docs
- Railway Docs: https://docs.railway.app
- Render Docs: https://render.com/docs

