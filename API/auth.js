import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import pool from "../db/pool.js";

const router = express.Router();

// POST /api/auth/register
router.post("/register", async (req, res) => {
  try {
    // 1. Get data from request body
    const { email, password, role, name, phone } = req.body;

    // 2. Validate required fields
    if (!email || !password || !role || !name || !phone) {
      return res.status(400).json({
        error: "Missing required fields: email, password, role, name, phone",
      });
    }

    // 3. Check if email already exists
    const existingUser = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email],
    );

    if (existingUser.rows.length > 0) {
      return res.status(400).json({
        error: "Email already exists",
      });
    }

    // 4. Hash the password (10 rounds of salting)
    const saltRounds = 10;
    const password_hash = await bcrypt.hash(password, saltRounds);

    // 5. Insert new user into database
    const result = await pool.query(
      `INSERT INTO users (email, password_hash, role, name, phone)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING id, email, role, name, phone, created_at`,
      [email, password_hash, role, name, phone],
    );

    // 6. Return the created user (without password hash)
    res.status(201).json({
      message: "User created successfully",
      user: result.rows[0],
    });
  } catch (err) {
    console.error("Registration error:", err);
    res
      .status(500)
      .json({ error: "Internal server error during registration" });
  }
});

export default router;
