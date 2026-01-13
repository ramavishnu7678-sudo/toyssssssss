# 🚀 Step-by-Step Hosting Guide

Complete guide to host your Kalaii Shop website online - **FREE**!

---

## 📋 Prerequisites Checklist

Before starting, make sure you have:
- ✅ Your code ready (you have it!)
- ✅ GitHub account (free) - [sign up here](https://github.com/signup)
- ✅ Email address for account creation

---

## 🎯 Overview

We'll deploy:
1. **Frontend** (Next.js) → **Vercel** (FREE, best for Next.js)
2. **Backend** (Express) → **Railway** (FREE tier available)

**Total time: 15-20 minutes**

---

## 📦 STEP 1: Push Your Code to GitHub (5 minutes)

### 1.1 Create GitHub Repository

1. Go to [github.com](https://github.com) and sign in
2. Click the **"+"** icon in top right → **"New repository"**
3. Fill in:
   - **Repository name**: `kalaii-shop` (or any name you like)
   - **Description**: "E-commerce toy shop website"
   - **Visibility**: Choose **Public** (for free hosting) or Private
   - ❌ **DO NOT** check "Initialize with README"
4. Click **"Create repository"**

### 1.2 Push Your Code

**Option A: Using Git Commands (Recommended)**

Open your project folder in terminal/command prompt and run:

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit your files
git commit -m "Initial commit - Ready for deployment"

# Add your GitHub repository (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/kalaii-shop.git

# Push to GitHub
git branch -M main
git push -u origin main
```

**If you get an error**, you might need to:
- Install Git: [Download Git](https://git-scm.com/download)
- Or use GitHub Desktop app instead

**Option B: Using GitHub Desktop (Easier)**

1. Download [GitHub Desktop](https://desktop.github.com/)
2. Install and sign in with your GitHub account
3. Click **"File"** → **"Add Local Repository"**
4. Navigate to your project folder: `C:\Users\Ramavishnu\OneDrive\Desktop\kalaii shop`
5. Click **"Publish repository"**
6. Enter repository name and click **"Publish"**

### 1.3 Verify Upload

1. Go back to your GitHub repository page
2. You should see all your files (app/, components/, server/, etc.)
3. ✅ **Step 1 Complete!**

---

## 🌐 STEP 2: Deploy Frontend to Vercel (5 minutes)

### 2.1 Create Vercel Account

1. Go to [vercel.com](https://vercel.com)
2. Click **"Sign Up"**
3. Choose **"Continue with GitHub"** (easiest way)
4. Authorize Vercel to access your GitHub account
5. ✅ Account created!

### 2.2 Deploy Your Project

1. After signing in, you'll see the Vercel dashboard
2. Click **"Add New..."** → **"Project"**
3. You'll see a list of your GitHub repositories
4. Find **"kalaii-shop"** (or whatever you named it)
5. Click **"Import"** next to your repository

### 2.3 Configure Project

Vercel will auto-detect it's a Next.js project. You'll see:

**Framework Preset**: Next.js (auto-detected) ✅

**Root Directory**: `./` (leave as is)

**Build Command**: `npm run build` (auto-filled) ✅

**Output Directory**: `.next` (auto-filled) ✅

**Install Command**: `npm install` (auto-filled) ✅

### 2.4 Add Environment Variable

1. Scroll down to **"Environment Variables"** section
2. Click **"Add"** to add a new variable
3. Add this (we'll update the value later after backend is deployed):
   - **Key**: `NEXT_PUBLIC_API_URL`
   - **Value**: `https://placeholder-url.com/api` (temporary, we'll change this)
4. Click **"Add"**

### 2.5 Deploy

1. Click the big **"Deploy"** button at the bottom
2. Wait 2-3 minutes for deployment
3. You'll see the build progress in real-time
4. When complete, you'll see: **"Congratulations! Your project has been deployed"**

### 2.6 Get Your Frontend URL

1. After deployment, you'll see a success page
2. Your site URL will be something like:
   - `https://kalaii-shop.vercel.app`
   - or `https://kalaii-shop-abc123.vercel.app`
3. **Copy this URL** - you'll need it for the backend!
4. Click on the URL to see your live website (it won't work fully yet, but the page loads!)
5. ✅ **Step 2 Complete!**

---

## 🔧 STEP 3: Deploy Backend to Railway (7 minutes)

### 3.1 Create Railway Account

1. Go to [railway.app](https://railway.app)
2. Click **"Start a New Project"**
3. Choose **"Login with GitHub"**
4. Authorize Railway to access your GitHub account
5. ✅ Account created!

### 3.2 Create New Project

1. In Railway dashboard, click **"New Project"**
2. Select **"Deploy from GitHub repo"**
3. You'll see a list of your repositories
4. Find **"kalaii-shop"** and click it

### 3.3 Configure Deployment

Railway will automatically:
- Detect it's a Node.js project
- Start deploying (you'll see build logs)

### 3.4 Add Environment Variables

This is important! Click on your deployed service, then:

1. Go to **"Variables"** tab
2. Click **"New Variable"** for each of these:

**Variable 1:**
- **Key**: `MONGODB_URI`
- **Value**: `mongodb+srv://ramavishnu7678_db_user:toyshop123@cluster0.sjfu5m1.mongodb.net/wondertoys?retryWrites=true&w=majority`
- Click **"Add"**

**Variable 2:**
- **Key**: `JWT_SECRET`
- **Value**: `your-super-secret-jwt-key-change-this-in-production`
- Click **"Add"**

**Variable 3:**
- **Key**: `JWT_EXPIRE`
- **Value**: `7d`
- Click **"Add"**

**Variable 4:**
- **Key**: `NODE_ENV`
- **Value**: `production`
- Click **"Add"**

**Variable 5:**
- **Key**: `FRONTEND_URL`
- **Value**: Paste your Vercel URL from Step 2.6 (e.g., `https://kalaii-shop.vercel.app`)
- Click **"Add"**

**Variable 6:**
- **Key**: `PORT`
- **Value**: `5000`
- Click **"Add"**

### 3.5 Get Your Backend URL

1. Go to the **"Settings"** tab of your Railway service
2. Scroll down to **"Domains"** section
3. Click **"Generate Domain"**
4. You'll get a URL like: `https://kalaii-shop-backend-production.up.railway.app`
5. **Copy this full URL** - this is your backend URL!
6. ✅ **Step 3 Complete!**

### 3.6 Verify Backend is Running

1. Open a new browser tab
2. Go to: `YOUR_BACKEND_URL/api/health`
   - Example: `https://kalaii-shop-backend-production.up.railway.app/api/health`
3. You should see: `{"status":"ok","message":"Server is running"}`
4. ✅ Backend is working!

---

## 🔗 STEP 4: Connect Frontend to Backend (3 minutes)

### 4.1 Update Vercel Environment Variable

1. Go back to [vercel.com](https://vercel.com)
2. Click on your project
3. Go to **"Settings"** tab
4. Click **"Environment Variables"** in the left sidebar
5. Find `NEXT_PUBLIC_API_URL`
6. Click the **"..."** menu → **"Edit"**
7. Update the **Value** to: `YOUR_RAILWAY_BACKEND_URL/api`
   - Example: `https://kalaii-shop-backend-production.up.railway.app/api`
   - ⚠️ Make sure to include `/api` at the end!
   - ⚠️ No trailing slash!
8. Click **"Save"**

### 4.2 Redeploy Frontend

1. After saving the environment variable
2. Go to **"Deployments"** tab
3. Click the **"..."** menu on the latest deployment
4. Click **"Redeploy"**
5. Confirm by clicking **"Redeploy"** again
6. Wait 1-2 minutes for redeployment
7. ✅ **Step 4 Complete!**

---

## ✅ STEP 5: Test Your Live Website (2 minutes)

### 5.1 Test Frontend

1. Go to your Vercel URL: `https://kalaii-shop.vercel.app`
2. Your website should load!
3. Try navigating to different pages

### 5.2 Test Login

1. Go to `/login` page
2. Try logging in (if you have an account)
3. Or register a new account

### 5.3 Test Admin Panel

1. Make sure you're logged in with: `ramavishnu7678@gmail.com`
2. Go to `/admin`
3. You should see the admin panel!
4. Try uploading a product image

### 5.4 Common Issues

**If frontend can't connect to backend:**
- ✅ Check `NEXT_PUBLIC_API_URL` in Vercel matches your Railway URL
- ✅ Make sure Railway backend is running (check health endpoint)
- ✅ Check browser console (F12) for errors

**If backend errors:**
- ✅ Check Railway logs (in Railway dashboard)
- ✅ Verify all environment variables are set correctly
- ✅ Make sure MongoDB connection string is correct

---

## 🎉 SUCCESS! Your Website is Live!

### Your Live URLs:
- **Frontend**: `https://kalaii-shop.vercel.app` (or your custom name)
- **Backend API**: `https://kalaii-shop-backend-production.up.railway.app/api`

### What Happens Next:

- ✅ **Auto-Deployments**: When you push code to GitHub, both platforms will automatically redeploy!
- ✅ **Free Forever**: Both Vercel and Railway have generous free tiers
- ✅ **Custom Domain**: You can add your own domain later in settings

---

## 📱 Share Your Website

You can now share your Vercel URL with anyone:
- Family and friends
- Customers
- On social media

**Example**: "Check out my toy shop: https://kalaii-shop.vercel.app"

---

## 🔄 Making Updates

Want to update your website?

1. Make changes to your code locally
2. Push to GitHub:
   ```bash
   git add .
   git commit -m "Updated website"
   git push
   ```
3. Vercel and Railway will automatically redeploy!
4. Wait 2-3 minutes, and your changes are live!

---

## 🆘 Need Help?

### Vercel Issues:
- Check Vercel dashboard → Deployments → Logs
- Vercel Docs: https://vercel.com/docs

### Railway Issues:
- Check Railway dashboard → Service → Logs
- Railway Docs: https://docs.railway.app

### Common Fixes:
- **"Cannot connect to server"**: Check backend URL is correct in Vercel env vars
- **"Build failed"**: Check build logs in Vercel/Railway dashboard
- **"MongoDB connection error"**: Verify MongoDB URI in Railway env vars

---

## ✅ Quick Checklist

- [ ] Code pushed to GitHub
- [ ] Frontend deployed to Vercel
- [ ] Backend deployed to Railway
- [ ] Environment variables set in Railway
- [ ] Frontend URL updated in Vercel env vars
- [ ] Website tested and working
- [ ] Admin panel accessible with `ramavishnu7678@gmail.com`

---

**🎊 Congratulations! Your website is now live on the internet!**

