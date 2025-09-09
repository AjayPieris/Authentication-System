import express from "express";
const authRouter = express.Router();
import { login, logout, register } from '../controllers/authController.js';


authRouter.post('/register', register);
authRouter.post('/login', login);
authRouter.post('/logout', logout);

export default authRouter;
