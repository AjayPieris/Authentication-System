# Quick Deployment Checklist ✅

Follow these steps in order:

## Step 1: Prepare Your Code ⚙️

- [ ] All files saved
- [ ] `.env` files are in `.gitignore` (already done ✅)
- [ ] `server/.env.example` and `client/.env.example` created (already done ✅)
- [ ] Test locally one more time

## Step 2: Push to GitHub 📤

Run these commands in your terminal:

```bash
# Check status
git status

# Add all files
git add .

# Commit changes
git commit -m "Ready for deployment"

# Push to GitHub
git push origin main
```

If you don't have a GitHub remote yet:

```bash
# Create new repo on GitHub first, then:
git remote add origin https://github.com/yourusername/Authentication-System.git
git branch -M main
git push -u origin main
```

## Step 3: Deploy Backend to Railway 🚂

1. [ ] Go to https://railway.app
2. [ ] Click "Start a New Project"
3. [ ] Select "Deploy from GitHub repo"
4. [ ] Choose your repository
5. [ ] Set Root Directory to `server`
6. [ ] Add MongoDB database (click "+ New" → "Database" → "MongoDB")
7. [ ] Add Environment Variables:
   ```
   MONGODB_URI=<copy from Railway MongoDB>
   JWT_SECRET=<your secret>
   EMAIL=<your email>
   EMAIL_PASSWORD=<your app password>
   PORT=5000
   CLIENT_URL=http://localhost:5173
   ```
8. [ ] Generate Domain in Settings → Networking
9. [ ] **Copy Backend URL** (e.g., `https://your-app.up.railway.app`)

## Step 4: Deploy Frontend to Vercel ▲

1. [ ] Go to https://vercel.com
2. [ ] Click "Add New Project"
3. [ ] Import your GitHub repository
4. [ ] Configure:
   - Framework Preset: **Vite**
   - Root Directory: **client**
   - Build Command: **npm run build**
   - Output Directory: **dist**
5. [ ] Add Environment Variable:
   ```
   VITE_API_URL=<your Railway backend URL>
   ```
   Example: `VITE_API_URL=https://your-app.up.railway.app`
6. [ ] Click "Deploy"
7. [ ] **Copy Frontend URL** (e.g., `https://your-app.vercel.app`)

## Step 5: Update Backend CORS 🔄

1. [ ] Go back to Railway
2. [ ] Click your backend service
3. [ ] Go to "Variables" tab
4. [ ] Update `CLIENT_URL` to your Vercel URL:
   ```
   CLIENT_URL=https://your-app.vercel.app
   ```
5. [ ] Railway will auto-redeploy

## Step 6: Test Everything 🧪

Visit your Vercel URL and test:

- [ ] Sign Up works
- [ ] Email OTP received
- [ ] Email verification works
- [ ] Login works
- [ ] Dashboard loads
- [ ] Logout works
- [ ] Forgot Password works
- [ ] Password Reset works

## Troubleshooting 🔧

### If you get CORS errors:

- Check `CLIENT_URL` in Railway matches Vercel URL exactly
- No trailing slash: ✅ `https://app.vercel.app` ❌ `https://app.vercel.app/`

### If emails don't send:

- Use Gmail App Password, not regular password
- Check EMAIL and EMAIL_PASSWORD in Railway

### If frontend can't connect:

- Verify `VITE_API_URL` in Vercel
- Must include `https://`
- Redeploy frontend after changing env vars

## URLs to Remember 📝

```
Frontend URL: _______________________________
Backend URL:  _______________________________
```

## Need Help?

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed instructions.

---

🎉 **Once all checkboxes are checked, you're LIVE!**
