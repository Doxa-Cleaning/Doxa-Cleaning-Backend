import express from "express";
import pool from "../db/pool.js";
import { authenticateToken, requireAdmin } from "../Middleware/auth.js";

const router = express.Router();

// Get all employees (users with role 'employee')
router.get("/", authenticateToken, requireAdmin, async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT id, name, email, phone FROM users WHERE role = 'employee' ORDER BY name ASC`,
    );
    res.json({ employees: result.rows });
  } catch (err) {
    console.error("Get employees error:", err);
    res.status(500).json({ error: "Server error retrieving employees" });
  }
});

router.delete("/:id", authenticateToken, requireAdmin, async (req, res) => {
  try {
    await pool.query("DELETE FROM users WHERE id = $1 AND role = 'employee'", [
      req.params.id,
    ]);
    res.json({ message: "Employee deleted" });
  } catch (err) {
    res.status(500).json({ error: "Delete failed" });
  }
});
export default router;
