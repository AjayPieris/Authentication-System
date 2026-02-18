# MERN Authentication System

A full-stack authentication system built with MongoDB, Express, React, and Node.js. Features include user registration, email verification, login, password reset, and secure authentication.

## ✨ Features

- 🔐 User Registration with Email Verification (OTP)
- 🔑 Secure Login with JWT Authentication
- 👁️ Password Visibility Toggle
- 🔄 Forgot Password / Reset Password (OTP-based)
- 📧 Email Notifications using Nodemailer
- 🎨 Modern UI with Tailwind CSS
- 🍪 HTTP-only Cookies for Security
- ⚡ Fast Performance with Vite

## 📁 Project Structure

```
Authentication-System/
├── client/          # React frontend (Vite + Tailwind)
│   ├── src/
│   │   ├── Pages/         # Login, Signup, ResetPassword, etc.
│   │   ├── components/    # Reusable components
│   │   ├── context/       # React Context for state management
│   │   └── assets/        # Images and icons
│   └── package.json
│
├── server/          # Node.js backend (Express)
│   ├── config/           # Database and email config
│   ├── controllers/      # Business logic
│   ├── Middleware/       # Auth middleware
│   ├── Models/           # MongoDB models
│   ├── routes/           # API routes
│   └── package.json
│
└── DEPLOYMENT.md    # Deployment guide
```

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- Gmail account (for email functionality)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/Authentication-System.git
   cd Authentication-System
   ```

2. **Setup Backend**

   ```bash
   cd server
   npm install
   ```

   Create `.env` file in `server/` folder:

   ```env
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key_here
   EMAIL=your_email@gmail.com
   EMAIL_PASSWORD=your_app_password_here
   PORT=5000
   CLIENT_URL=http://localhost:5173
   ```

3. **Setup Frontend**

   ```bash
   cd ../client
   npm install
   ```

   Create `.env` file in `client/` folder:

   ```env
   VITE_API_URL=http://localhost:5000
   ```

4. **Run the Application**

   Terminal 1 (Backend):

   ```bash
   cd server
   npm run server
   ```

   Terminal 2 (Frontend):

   ```bash
   cd client
   npm run dev
   ```

5. **Access the Application**
   - Frontend: http://localhost:5173
   - Backend: http://localhost:5000

## 📧 Email Configuration

For Gmail:

1. Enable 2-Factor Authentication
2. Generate App Password: [Google Account Settings](https://myaccount.google.com/apppasswords)
3. Use the generated password in `EMAIL_PASSWORD`

## 🌐 Deployment

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed deployment instructions.

### Quick Deploy Links:

- **Backend**: [Railway](https://railway.app) - Deploy Node.js + MongoDB
- **Frontend**: [Vercel](https://vercel.com) - Deploy React app

## 🛠️ Technologies Used

### Frontend

- React 19
- React Router DOM
- Axios
- Tailwind CSS 4
- Vite
- React Toastify

### Backend

- Node.js
- Express.js
- MongoDB with Mongoose
- JWT (JSON Web Tokens)
- Bcrypt.js
- Nodemailer
- Cookie Parser
- CORS

## 📝 API Endpoints

### Authentication Routes (`/api/auth`)

- `POST /register` - Register new user
- `POST /login` - User login
- `POST /logout` - User logout
- `POST /send-verify-otp` - Send email verification OTP
- `POST /verify-account` - Verify email with OTP
- `GET /is-authenticated` - Check auth status
- `POST /send-reset-otp` - Send password reset OTP
- `POST /reset-password` - Reset password with OTP

### User Routes (`/api/user`)

- `GET /data` - Get user data (protected)

## 🔒 Security Features

- Passwords hashed with bcrypt
- JWT tokens with HTTP-only cookies
- CORS protection
- Email verification required
- OTP-based password reset
- Token expiration
- Secure cookie settings

## 📸 Screenshots

(Add screenshots of your application here)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the ISC License.

## 👨‍💻 Author

Your Name

## 🙏 Acknowledgments

- React community
- Express.js team
- MongoDB team
- All open-source contributors

---

**Happy Coding! 🚀**
