# Deployment Guide

## Railway (Backend) Environment Variables

Copy these environment variables to your Railway deployment:

### Required Variables:

```env
NODE_ENV=production
PORT=5000
CLIENT_URL=https://authentication-system-ajaypieris-projects.vercel.app
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
MONGODB_URI=your-mongodb-connection-string
```

### Email Configuration (SMTP - Required for emails):

```env
SMTP_HOST=smtp-relay.brevo.com
SMTP_PORT=587
SMTP_USER=your-brevo-smtp-username
SMTP_PASS=your-brevo-smtp-password
SENDER_EMAIL=your-verified-sender@email.com
```

### How to Get SMTP Credentials:

1. **Brevo (Recommended - Free tier available)**:
   - Sign up at https://www.brevo.com
   - Go to Settings → SMTP & API
   - Create an SMTP key
   - Use the SMTP credentials shown

2. **Gmail** (Alternative):
   - Enable 2FA on your Google account
   - Generate an App Password
   - Use: `SMTP_HOST=smtp.gmail.com`, `SMTP_PORT=587`

3. **SendGrid** (Alternative):
   - Sign up at https://sendgrid.com
   - Create an API key
   - Use their SMTP credentials

### Steps to Add Variables in Railway:

1. Go to your Railway project dashboard
2. Click on your service
3. Click on **Variables** tab
4. Click **+ New Variable**
5. Add each variable one by one
6. Railway will automatically redeploy after you save

---

## Vercel (Frontend) Environment Variables

Add this to your Vercel project:

```env
VITE_API_URL=https://authentication-system-production-22ed.up.railway.app
```

### Steps to Add Variables in Vercel:

1. Go to your Vercel project dashboard
2. Click **Settings** → **Environment Variables**
3. Add `VITE_API_URL` with the Railway backend URL
4. Click **Save**
5. Redeploy your application

---

## Testing Your Deployment

### 1. Test Backend API:

Visit: `https://authentication-system-production-22ed.up.railway.app/api/debug`

Should return:

```json
{
  "nodeEnv": "production",
  "allowedOrigins": [
    "https://authentication-system-ajaypieris-projects.vercel.app"
  ],
  "hasCookie": false,
  "hasJwtSecret": true,
  "hasSmtpConfig": true
}
```

### 2. Test Frontend:

- Visit your Vercel URL
- Try registering a new account
- Check if you receive the welcome email
- Try logging in
- Test password reset

---

## Troubleshooting

### Issue: Not logged in after registration

- **Check**: Railway has `NODE_ENV=production`
- **Check**: Vercel URL is added to `CLIENT_URL` in Railway

### Issue: Email not sending

- **Check**: SMTP credentials are correct in Railway
- **Check**: Railway logs for email errors (View Logs in Railway dashboard)
- **Check**: Sender email is verified with your SMTP provider

### Issue: CORS errors

- **Check**: `CLIENT_URL` matches your Vercel deployment URL exactly
- **Check**: No trailing slashes in URLs

---

## Security Notes

⚠️ **NEVER commit `.env` files to Git**

✅ Use different `JWT_SECRET` for production
✅ Use environment variables for all sensitive data
✅ Keep SMTP credentials secure
