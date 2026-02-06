import express from "express";
import cors from "cors";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Home Route
app.get("/", (req, res) => {
  res.send({
    message: "Welcome to Doxa Cleaning llc API!",
    version: "1.0.0",
    endpoints: {
      health: "/api/health",
      docs: "Coming Soon...",
    },
  });
});

// Simple health check route
app.get("/api/health", (req, res) => {
  res.send({
    message: "Doxa API is alive and well!",
    uptime: process.uptime(),
    timestamp: Date.now(),
  });
});

export default app;
