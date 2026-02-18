# Deployment Guide - MERN Authentication System

## Prerequisites

- GitHub account
- Railway account (for backend + MongoDB)
- Vercel account (for frontend)

---

## Part 1: Deploy Backend to Railway

### Step 1: Prepare Your Backend

1. Make sure your code is pushed to GitHub
2. Ensure `server/package.json` has the correct start script:
   ```json
   "scripts": {
     "start": "node server.js"
   }
   ```

### Step 2: Create Railway Project

1. Go to [Railway.app](https://railway.app)
2. Click **"Start a New Project"**
3. Select **"Deploy from GitHub repo"**
4. Authorize Railway to access your GitHub
5. Select your repository: `Authentication-System`

### Step 3: Configure Railway Deployment

1. Railway will detect your server folder
2. Click on the deployed service
3. Go to **Settings** → **Root Directory**
4. Set Root Directory to: `server`
5. Click **"Save"**

### Step 4: Add MongoDB Database

1. In your Railway project, click **"+ New"**
2. Select **"Database"** → **"Add MongoDB"**
3. MongoDB instance will be created automatically
4. Copy the **Connection String** (MONGO_URI)

### Step 5: Set Environment Variables

1. Click on your backend service
2. Go to **"Variables"** tab
3. Add the following variables:
   ```
   MONGODB_URI=<your-railway-mongodb-connection-string>
   JWT_SECRET=<your-secret-key>
   EMAIL=<your-email-for-nodemailer>
   EMAIL_PASSWORD=<your-email-app-password>
   PORT=5000
   ```
   **Important:** Copy these exact values from your local `server/.env` file

### Step 6: Get Backend URL

1. Go to **"Settings"** → **"Networking"**
2. Click **"Generate Domain"**
3. Copy the generated URL (e.g., `https://your-app.up.railway.app`)
4. **Save this URL** - you'll need it for Vercel!

### Step 7: Update CORS Configuration

Your backend is now live! Note down the Railway URL.

---

## Part 2: Deploy Frontend to Vercel

### Step 1: Prepare Frontend

1. Make sure your code is committed to GitHub
2. Ensure `client/.env` exists with:
   ```
   VITE_API_URL=<your-railway-backend-url>
   ```
   Example: `VITE_API_URL=https://your-app.up.railway.app`

### Step 2: Create Vercel Project

1. Go to [Vercel.com](https://vercel.com)
2. Click **"Add New Project"**
3. Import your GitHub repository
4. Select the repository: `Authentication-System`

### Step 3: Configure Vercel Build Settings

1. **Framework Preset**: Vite
2. **Root Directory**: `client`
3. **Build Command**: `npm run build`
4. **Output Directory**: `dist`

### Step 4: Add Environment Variables

1. In **"Environment Variables"** section, add:

   ```
   VITE_API_URL=<your-railway-backend-url>
   ```

   Example: `VITE_API_URL=https://your-app.up.railway.app`

2. Click **"Deploy"**

### Step 5: Get Frontend URL

1. After deployment, Vercel will give you a URL like:
   `https://your-app.vercel.app`
2. **Copy this URL** - you need to update backend CORS!

---

## Part 3: Update Backend CORS (Important!)

### Step 1: Update CORS in Railway

1. Go back to **Railway**
2. Click on your backend service
3. Go to **"Variables"** tab
4. Add new variable:
   ```
   CLIENT_URL=https://your-app.vercel.app
   ```

---

## Part 4: Test Your Deployment

### Test Checklist:

1. ✅ Visit your Vercel frontend URL
2. ✅ Try to Sign Up with a new account
3. ✅ Check email for verification OTP
4. ✅ Verify email with OTP
5. ✅ Try Login
6. ✅ Test Forgot Password
7. ✅ Test Reset Password

---

## Troubleshooting

### Railway Build Errors ("Railpack could not determine how to build the app")

**Solution:**

1. Make sure `nixpacks.toml` and `railway.json` exist in the `server/` folder (already created ✅)
2. Push the changes to GitHub:
   ```bash
   git add .
   git commit -m "Add Railway config files"
   git push
   ```
3. Railway will auto-redeploy
4. If still failing, manually trigger redeploy in Railway dashboard

**Alternative:** In Railway Settings → Deploy, set:

- **Build Command**: `npm install`
- **Start Command**: `npm start`

### CORS Errors

- Make sure `CLIENT_URL` in Railway matches your Vercel URL exactly
- No trailing slash in URLs
- Redeploy backend after changing environment variables

### Email Not Sending

- Check `EMAIL` and `EMAIL_PASSWORD` are correct
- For Gmail, use App Password (not regular password)
- Enable "Less secure app access" or use App Password

### Database Connection Issues

- Verify `MONGODB_URI` is copied correctly from Railway MongoDB
- Check Railway logs for connection errors

### Frontend Can't Connect to Backend

- Verify `VITE_API_URL` in Vercel points to Railway backend URL
- Must include `https://` in the URL
- Redeploy frontend after changing environment variables

---

## Environment Variables Summary

### Backend (Railway)

```env
MONGODB_URI=<railway-mongodb-uri>
JWT_SECRET=<your-secret>
EMAIL=<your-email>
EMAIL_PASSWORD=<email-app-password>
CLIENT_URL=<vercel-frontend-url>
PORT=5000
```

### Frontend (Vercel)

```env
VITE_API_URL=<railway-backend-url>
```

---

## Useful Commands

### View Railway Logs

```bash
npm i -g @railway/cli
railway login
railway logs
```

### Redeploy on Vercel

- Push to GitHub → Auto-deploys
- Or use Vercel dashboard → Deployments → Redeploy

---

## Next Steps After Deployment

1. **Custom Domain** (Optional)
   - Add your custom domain in Vercel
   - Update `CLIENT_URL` in Railway

2. **Monitor Logs**
   - Railway: Check service logs
   - Vercel: Check function logs

3. **Set Up Alerts**
   - Railway: Enable deployment notifications
   - Vercel: Enable deployment notifications

---

🎉 **Congratulations! Your MERN Authentication System is now live!**
