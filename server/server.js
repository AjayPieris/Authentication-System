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

// Debug endpoint - check server configuration
app.get("/api/debug", (req, res) => {
  res.json({
    nodeEnv: process.env.NODE_ENV,
    allowedOrigins: allowedOrigins,
    hasCookie: !!req.cookies.token,
    hasJwtSecret: !!process.env.JWT_SECRET,
    hasSmtpConfig: !!(process.env.SMTP_USER && process.env.SMTP_PASS),
    smtpHost: process.env.SMTP_HOST,
    smtpPort: process.env.SMTP_PORT,
    smtpUser: process.env.SMTP_USER,
    senderEmail: process.env.SENDER_EMAIL,
  });
});

// Test email endpoint - send a test email
app.get("/api/test-email", async (req, res) => {
  try {
    const nodemailer = await import("nodemailer");
    const transporter = nodemailer.default.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.SENDER_EMAIL,
      to: process.env.SENDER_EMAIL, // send to yourself
      subject: "Test Email from Railway",
      text: "If you receive this, SMTP is working correctly!",
      html: "<h1>Success!</h1><p>SMTP configuration is working.</p>",
    });

    res.json({ success: true, message: "Test email sent! Check your inbox." });
  } catch (error) {
    console.error("Test email failed:", error);
    res.json({
      success: false,
      message: error.message,
      error: error.toString(),
    });
  }
});

app.listen(port, () => {
  console.log(`✅ Server is running on http://localhost:${port}`);
});
