# 🚀 Deployment Guide - Environment Variables Setup

This guide explains how to set up environment variables for different deployment platforms.

## 📋 Environment Variables Required

| Variable | Description | Local Dev | Production |
|----------|-------------|-----------|------------|
| `NEXT_PUBLIC_API_URL` | Backend API URL | `http://localhost:3001` | `https://nyota-backend.onrender.com` |

## 🛠️ Local Development Setup

1. **Copy the environment file:**
   ```bash
   cp env.example .env.local
   ```

2. **Update the API URL in `.env.local`:**
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:3001
   ```

3. **Start your development server:**
   ```bash
   npm run dev
   ```

## 🌐 Production Deployment

### Vercel Deployment

1. **Go to your Vercel dashboard**
2. **Select your project** → **Settings** → **Environment Variables**
3. **Add the following variable:**
   - **Name:** `NEXT_PUBLIC_API_URL`
   - **Value:** `https://nyota-backend.onrender.com`
   - **Environment:** Production (and Preview if needed)

4. **Redeploy your application**

### Netlify Deployment

1. **Go to your Netlify dashboard**
2. **Select your site** → **Site Settings** → **Environment Variables**
3. **Add the following variable:**
   - **Key:** `NEXT_PUBLIC_API_URL`
   - **Value:** `https://nyota-backend.onrender.com`

4. **Redeploy your application**

### Manual Deployment (VPS, etc.)

1. **Set the environment variable:**
   ```bash
   export NEXT_PUBLIC_API_URL=https://nyota-backend.onrender.com
   ```

2. **Or add to your `.env` file:**
   ```env
   NEXT_PUBLIC_API_URL=https://nyota-backend.onrender.com
   ```

3. **Build and start:**
   ```bash
   npm run build
   npm start
   ```

## 🔍 Testing Your Configuration

After deployment, you can verify your configuration is working:

1. **Open browser dev tools** (F12)
2. **Check the console** for the API URL log message
3. **Test an API call** (e.g., login) and check the Network tab
4. **Verify requests** are going to the correct backend URL

## 🐛 Troubleshooting

### Common Issues:

1. **API calls going to localhost in production:**
   - Check that `NEXT_PUBLIC_API_URL` is set correctly
   - Ensure the variable is prefixed with `NEXT_PUBLIC_`
   - Redeploy after setting the variable

2. **CORS errors:**
   - Ensure your backend allows requests from your frontend domain
   - Check that the backend URL is correct

3. **Environment variable not updating:**
   - Clear browser cache
   - Hard refresh (Ctrl+Shift+R)
   - Check that the variable is set in the correct environment

### Debug Commands:

```bash
# Check if environment variable is set
echo $NEXT_PUBLIC_API_URL

# Build with verbose output
npm run build

# Check the built application
npm start
```

## 📝 Notes

- Environment variables prefixed with `NEXT_PUBLIC_` are available in the browser
- Variables without this prefix are only available on the server side
- Always restart your development server after changing environment variables
- For production, you must redeploy after changing environment variables
