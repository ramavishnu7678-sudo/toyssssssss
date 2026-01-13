# ⚡ Quick Deploy - Get Your Site Live in 15 Minutes!

## 🎯 Fastest Way to Deploy

### Option 1: One-Click Deploy (Recommended)

#### Frontend (Vercel):
1. **Go to**: https://vercel.com/new
2. **Import** your GitHub repository
3. **Add Environment Variable**:
   - Key: `NEXT_PUBLIC_API_URL`
   - Value: `https://your-backend-url.railway.app/api` (add this after backend deploys)
4. **Click Deploy** → Done! ✅

#### Backend (Railway):
1. **Go to**: https://railway.app/new
2. **Deploy from GitHub** → Select your repo
3. **Add Environment Variables**:
   ```
   MONGODB_URI=mongodb+srv://ramavishnu7678_db_user:toyshop123@cluster0.sjfu5m1.mongodb.net/wondertoys?retryWrites=true&w=majority
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   JWT_EXPIRE=7d
   NODE_ENV=production
   FRONTEND_URL=https://your-vercel-url.vercel.app
   ```
4. **Get your backend URL** → Update Vercel env var → Redeploy

---

## 📝 Step-by-Step (5 Minutes Each)

### Step 1: Push to GitHub (2 min)
```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

### Step 2: Deploy Frontend - Vercel (3 min)
1. Visit: https://vercel.com
2. Sign in with GitHub
3. Click "Add New" → "Project"
4. Select your repository
5. Click "Deploy"
6. **Copy your Vercel URL** (e.g., `kalaii-shop.vercel.app`)

### Step 3: Deploy Backend - Railway (5 min)
1. Visit: https://railway.app
2. Sign in with GitHub
3. Click "New Project" → "Deploy from GitHub"
4. Select your repository
5. Go to "Variables" tab
6. Add all environment variables (see above)
7. **Copy your Railway URL** (e.g., `kalaii-shop-backend.railway.app`)

### Step 4: Connect Frontend to Backend (2 min)
1. Go back to Vercel
2. Settings → Environment Variables
3. Update `NEXT_PUBLIC_API_URL` = `https://your-railway-url.railway.app/api`
4. Redeploy (automatic)

### Step 5: Test (1 min)
1. Visit your Vercel URL
2. Try logging in
3. Access admin: `/admin` with `ramavishnu7678@gmail.com`

---

## ✅ Your Live URLs Will Be:

- **Website**: `https://kalaii-shop.vercel.app`
- **API**: `https://kalaii-shop-backend.railway.app/api`

---

## 🆘 Quick Fixes

**Backend not working?**
- Check Railway logs
- Verify MongoDB connection string
- Make sure all env vars are set

**Frontend can't connect?**
- Check `NEXT_PUBLIC_API_URL` in Vercel
- Make sure backend URL is correct (no trailing slash)
- Check browser console for errors

---

## 🎉 Done!

Your site is live! Share the Vercel URL with anyone.

**Total Time**: ~15 minutes
**Cost**: FREE (both platforms have free tiers)

