import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import UserRoutes from "./routes/user.route.js";
import AuthRoutes from "./routes/auth.route.js";
import cookieParser from "cookie-parser";
import postRoute from "../api/routes/post.route.js";
import CommentRoute from "../api/routes/comment.route.js";
dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());

// Connect to MongoDB
(async () => {
  try {
    mongoose.connect(process.env.MONGO);

    console.log("MongoDB is connected");
  } catch (error) {
    console.log("Failed to connect to MongoDB" + error);
  }
})();

// Routes
app.use("/api/post", postRoute);
app.use("/api/user", UserRoutes);
app.use("/api/auth", AuthRoutes);
app.use("/api/comment", CommentRoute);

// Error handling middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000!!!");
});
