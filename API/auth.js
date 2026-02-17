import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import pool from "../db/pool.js";

const router = express.Router();

// Creates a new user and enters them into DB table
router.post("/register", async (req, res) => {
  try {
    // Users inputted data is sent back
    const { email, password, role, name, phone } = req.body;

    // Check to make sure all required fields are submitted
    if (!email || !password || !role || !name || !phone) {
      return res.status(400).json({
        error: "Missing required fields: email, password, role, name, phone",
      });
    }

    // Check if entered email already exists
    const existingUser = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email],
    );

    if (existingUser.rows.length > 0) {
      return res.status(400).json({
        error: "Email already exists",
      });
    }

    // Use bcrypt to hash the password 10 times for extra security
    const saltRounds = 10;
    const password_hash = await bcrypt.hash(password, saltRounds);

    // Insert new created user into table
    const result = await pool.query(
      `INSERT INTO users (email, password_hash, role, name, phone)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING id, email, role, name, phone, created_at`,
      [email, password_hash, role, name, phone],
    );

    // Shows the created users data (WITHOUT THE HASHED PASSWORD)
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

// Create a logged in session for the user trying to login
router.post("/login", async (req, res) => {
  try {
    // Sends email and password that user inputted
    const { email, password } = req.body;

    // Check to make sure the required fields are actually there
    if (!email || !password) {
      return res.status(400).json({
        error: "Email and password are required",
      });
    }

    // Use the entered email to search for that user
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    // Check if that user exists and if not send error code.
    if (result.rows.length === 0) {
      return res.status(401).json({
        error: "Invalid email or password",
      });
    }

    const user = result.rows[0];

    // Check if the entered password matched the hashed password
    const isValidPassword = await bcrypt.compare(password, user.password_hash);

    if (!isValidPassword) {
      return res.status(401).json({
        error: "Invalid email or password",
      });
    }

    // Creates a JWT token for the user if their account is found
    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "24h" },
    );

    // Sends a success message and shows the users info except hashed_password
    res.json({
      message: "Login successful",
      token: token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        name: user.name,
        phone: user.phone,
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Server error during login" });
  }
});

export default router;
