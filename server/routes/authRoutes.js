import express from "express";
const authrouter = express.Router();
import { login, logout, register } from '../controllers/authController.js';


authrouter.post('/register', register);
authrouter.post('/login', login);
authrouter.post('/logout', logout);

export default authrouter;
