import express from "express";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";
// import mongoose, { connect } from "mongoose";
import "./config/mongodb.js"; // Ensure MongoDB connection is established
import connectDB from "./config/mongodb.js";
import authRouter from "./routes/authRoutes.js";
// import transporter from "./config/nodemailar.js";

const app = express();
const port = process.env.PORT || 5000;
connectDB();

app.use(express.json());
app.use(cookieParser());
app.use(cors({ credentials: true }));

// Api Endpoints
app.get("/", (req, res) => {
  res.send("Hello World! ....");
});

app.use("/api/auth", authRouter);

app.listen(port, () => 
  console.log(`Server is running on port ${port}`)
);
