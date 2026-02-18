import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import "dotenv/config";
import connectDB from "./config/mongodb.js";
import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoutes.js";

const app = express();
const port = process.env.PORT || 5000;

// Allow multiple origins for CORS (local + production)
const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(",")
  : ["http://localhost:5173"];

console.log("🔐 Allowed CORS origins:", allowedOrigins);

// Connect to MongoDB once
connectDB();

// Middleware - CORS must be before routes
const corsOptions = {
  origin: function (origin, callback) {
    console.log("📡 Request from origin:", origin);
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1 || allowedOrigins.includes("*")) {
      callback(null, true);
    } else {
      console.error("❌ Origin not allowed:", origin);
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization", "Cookie"],
  exposedHeaders: ["set-cookie"],
  preflightContinue: false,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));

// Handle preflight requests
app.options("*", cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

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
