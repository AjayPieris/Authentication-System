import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import cookieParser from 'cookie-parser';
import mongoose, { connect } from 'mongoose';
import './config/mongodb.js'; // Ensure MongoDB connection is established
import connectDB from './config/mongodb.js';
import authrouter from './routes/authRoutes.js';

const app = express();
const PORT = process.env.PORT || 5000;
connectDB();

app.use(express.json());
app.use(cookieParser());
app.use(cors({credentials: true}));

// Api Endpoints
app.get('/', (req, res) => {
    res.send('Hello World! ....');
});

app.use('/api/auth', authrouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});