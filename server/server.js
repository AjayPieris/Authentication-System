import express from "express";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";
import connectDB from "./config/mongodb.js";
import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoutes.js";


const app = express();
const port = process.env.PORT || 5000;

// Connect to MongoDB once
connectDB();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    credentials: true
  })
);

// Routes
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);

app.use((_req, res) => {
  res.status(404).json({ message: "Requested resource could not be found." });
});


app.listen(port, () => {
  console.log(`✅ Server is running on http://localhost:${port}`);
});
