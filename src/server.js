
import dotenv from "dotenv";

// Load environment before application setup
const envFile =
  process.env.NODE_ENV === "production"
    ? ".env.production"
    : ".env.dev";

dotenv.config({ path: envFile });

import express from "express";
import cors from "cors";

import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import resumeRoutes from "./routes/resumeRoutes.js";

const app = express();

// CORS Configuration
const allowedOrigins = [
  "http://localhost:3000",
  process.env.CLIENT_URL,
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);

app.use(express.json());

// Database Connection Middleware
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    console.error("DATABASE CONNECTION ERROR:", error.message);

    res.status(500).json({
      success: false,
      message: "Database connection failed!",
      error: error.message,
    });
  }
});

// Health Check
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Resume Maker Backend API is running",
    environment: process.env.NODE_ENV || "development",
  });
});

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/resumes", resumeRoutes);

// Local Development
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 5000;

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

// Export for Vercel
export default app;
