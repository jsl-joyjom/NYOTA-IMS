# 🚀 Deployment Guide

## Quick Deploy to Railway

1. **Connect to Railway:**
   - Go to [railway.app](https://railway.app)
   - Sign in with GitHub
   - Click "New Project" → "Deploy from GitHub repo"

2. **Configure Environment Variables:**
   - Go to your project → Variables tab
   - Add all variables from `env.example`
   - Set `NODE_ENV=production`
   - Set `PORT` (Railway will provide this)

3. **Deploy:**
   - Railway will automatically detect Node.js
   - Build command: `npm install`
   - Start command: `npm start`

## Quick Deploy to Render

1. **Connect to Render:**
   - Go to [render.com](https://render.com)
   - Sign in with GitHub
   - Click "New" → "Web Service"

2. **Configure:**
   - Connect your GitHub repo
   - Build command: `npm install`
   - Start command: `npm start`
   - Environment: `Node`

3. **Environment Variables:**
   - Add all variables from `env.example`
   - Set `NODE_ENV=production`

## Environment Variables Required

```env
NODE_ENV=production
PORT=3001
DB_HOST=your_db_host
DB_PORT=5432
DB_NAME=nyota_platform
DB_USER=your_db_user
DB_PASSWORD=your_db_password
JWT_SECRET=your_jwt_secret
```

## Database Setup

1. **Create PostgreSQL database**
2. **Run migrations:**
   ```bash
   npm run migrate
   ```

## Health Check

After deployment, test:
- `GET https://your-app-url/health`

Should return: `{"status": "OK", "timestamp": "..."}`
