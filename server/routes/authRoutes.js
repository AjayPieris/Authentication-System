import express from "express";
const authRouter = express.Router();

import { 
  login, 
  logout, 
  register, 
  sendVerifyOtp, 
  resendVerifyOtp,      // <- import resend controller
  verifyEmail, 
  isAuthenticated, 
  sendResetOtp, 
  resetPassword 
} from "../controllers/authController.js";

import userAuth from "../Middleware/userAuth.js";

// Public routes (no JWT required)
authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.post("/logout", logout);
authRouter.post("/send-reset-otp", sendResetOtp);   // forgot password
authRouter.post("/reset-password", resetPassword);  // reset password

// Protected routes (JWT required via cookie)
authRouter.post("/send-verify-otp", userAuth, sendVerifyOtp);
authRouter.post("/resend-verify-otp", userAuth, resendVerifyOtp); // <- new route
authRouter.post("/verify-account", userAuth, verifyEmail);
authRouter.get("/is-authenticated", userAuth, isAuthenticated);

export default authRouter;
