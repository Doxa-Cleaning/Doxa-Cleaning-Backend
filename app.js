import express from "express";
import cors from "cors";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Simple health check route
app.get("/api/health", (req, res) => {
  res.send({
    message: "Doxa API is alive and well!",
    uptime: process.uptime(),
    timestamp: Date.now(),
  });
});

export default app;
