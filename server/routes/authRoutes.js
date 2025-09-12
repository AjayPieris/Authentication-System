import express from "express";
const authRouter = express.Router();
import { login, logout, register, sendVerifyOtp, verifyEmail, isAuthenticated, sendResetOtp, resetPassword} from '../controllers/authController.js';
import userAuth from "../Middleware/userAuth.js";

authRouter.post('/register', register);
authRouter.post('/login', login);
authRouter.post('/logout', logout);
authRouter.post('/send-verify-otp', userAuth, sendVerifyOtp);
authRouter.post('/verify-account', userAuth, verifyEmail);
authRouter.post('/is-authenticated', userAuth, isAuthenticated);
authRouter.post('/send-reset-otp', userAuth, sendResetOtp);
authRouter.post('/reset-password', userAuth, resetPassword);

export default authRouter;