import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import "dotenv/config";
import connectDB from "./config/mongodb.js";
import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoutes.js";

const app = express();
const port = process.env.PORT || 5000;
const allowedOrigins = "http://localhost:5173"; // Replace with your client's URL

// Connect to MongoDB once
connectDB();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  }),
);

// Routes
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);

// Test route
app.get("/", (req, res) => {
  res.send("Welcome to the Authentication System API");
});

app.listen(port, () => {
  console.log(`✅ Server is running on http://localhost:${port}`);
});
