import express from "express";
import userAuth from "../Middleware/userAuth.js";
const userRouter = express.Router();
import { getUserData } from '../controllers/userController.js';

userRouter.get('/data', userAuth, getUserData);

export default userRouter;
