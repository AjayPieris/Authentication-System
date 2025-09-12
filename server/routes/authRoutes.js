import express from "express";
const authRouter = express.Router();
import { login, logout, register, sendVerifyOtp, verifyEmail, isAuthenticated} from '../controllers/authController.js';
import userAuth from "../Middleware/userAuth.js";

authRouter.post('/register', register);
authRouter.post('/login', login);
authRouter.post('/logout', logout);
authRouter.post('/send-verify-otp', userAuth, sendVerifyOtp);
authRouter.post('/verify-account', userAuth, verifyEmail);
authRouter.post('/is-authenticated', userAuth, isAuthenticated);

export default authRouter;