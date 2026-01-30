# TurfBook Deployment Guide

This guide will help you deploy your TurfBook application to Vercel or Netlify.

## Prerequisites

- GitHub account
- Vercel or Netlify account
- MongoDB Atlas account (for database hosting)

## Step 1: Setup MongoDB Atlas

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Create a database user
4. Whitelist all IP addresses (0.0.0.0/0) for development
5. Get your connection string

## Step 2: Deploy Backend (Server)

### Option A: Deploy to Render.com (Recommended for backend)

1. Push your code to GitHub
2. Go to [Render.com](https://render.com)
3. Click "New +" → "Web Service"
4. Connect your GitHub repository
5. Configure:
   - **Name**: turfbook-api
   - **Root Directory**: server
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
6. Add Environment Variables:
   - `MONGODB_URI`: Your MongoDB Atlas connection string
   - `PORT`: 5000
   - `CORS_ORIGIN`: Your frontend URL (add after frontend deployment)
7. Click "Create Web Service"
8. Copy your backend URL (e.g., `https://turfbook-api.onrender.com`)

### Option B: Deploy to Railway.app

1. Go to [Railway.app](https://railway.app)
2. Click "New Project" → "Deploy from GitHub repo"
3. Select your repository
4. Configure root directory to `server`
5. Add environment variables (same as above)

## Step 3: Deploy Frontend

### Option A: Deploy to Vercel

1. Install Vercel CLI (optional):
   ```bash
   npm install -g vercel
   ```

2. Push your code to GitHub

3. Go to [Vercel](https://vercel.com)

4. Click "Add New" → "Project"

5. Import your GitHub repository

6. Configure:
   - **Framework Preset**: Vite
   - **Root Directory**: ./
   - **Build Command**: `npm run build`
   - **Output Directory**: dist

7. Add Environment Variable:
   - `VITE_API_BASE_URL`: Your backend URL from Step 2

8. Click "Deploy"

9. Update backend CORS_ORIGIN with your Vercel URL

### Option B: Deploy to Netlify

1. Push your code to GitHub

2. Go to [Netlify](https://netlify.com)

3. Click "Add new site" → "Import an existing project"

4. Connect to GitHub and select your repository

5. Configure:
   - **Build command**: `npm run build`
   - **Publish directory**: dist

6. Add Environment Variable:
   - `VITE_API_BASE_URL`: Your backend URL from Step 2

7. Click "Deploy site"

8. Update backend CORS_ORIGIN with your Netlify URL

## Step 4: Update API Configuration

After deploying both frontend and backend:

1. Update `src/utils/api.js` with your production API URL:
   ```javascript
   const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';
   ```

2. Update backend CORS settings in `server/index.js`:
   ```javascript
   const corsOptions = {
     origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
     credentials: true
   };
   app.use(cors(corsOptions));
   ```

3. Redeploy both applications

## Step 5: Test Your Deployment

1. Visit your frontend URL
2. Test the following:
   - Homepage loads correctly
   - Sign up/Sign in functionality
   - Booking functionality
   - Admin features (if applicable)
   - All images load properly

## Important Notes

- **Environment Variables**: Never commit `.env` files to GitHub
- **MongoDB**: Use MongoDB Atlas for production database
- **HTTPS**: Both Vercel and Netlify provide free HTTPS
- **Custom Domain**: You can add custom domains in Vercel/Netlify settings
- **Backend Sleep**: Free tier backends may sleep after inactivity

## Troubleshooting

### Frontend not connecting to backend
- Check VITE_API_BASE_URL is correctly set
- Ensure backend CORS allows your frontend domain
- Check browser console for errors

### Database connection errors
- Verify MongoDB Atlas connection string
- Check IP whitelist in MongoDB Atlas
- Ensure database user has correct permissions

### Build failures
- Check Node.js version (18+ recommended)
- Clear cache and rebuild
- Check for missing dependencies

## Continuous Deployment

Both Vercel and Netlify automatically redeploy when you push to GitHub:
1. Make changes locally
2. Commit and push to GitHub
3. Deployment happens automatically

---

**Your TurfBook application is now live! 🎉**

Share your deployment URLs:
- Frontend: `https://your-app.vercel.app` or `https://your-app.netlify.app`
- Backend: `https://your-api.onrender.com` or `https://your-api.railway.app`
