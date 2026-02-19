import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import "dotenv/config";
import connectDB from "./config/mongodb.js";
import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoutes.js";

const app = express();
const port = process.env.PORT || 5000;

// Parse CLIENT_URL - supports comma-separated multiple origins
const clientUrlString = process.env.CLIENT_URL || "http://localhost:5173";
const allowedOrigins = clientUrlString.split(",").map((url) => url.trim());

// Connect to MongoDB once
connectDB();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);

      if (allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
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
