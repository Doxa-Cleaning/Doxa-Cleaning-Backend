import express from "express";
import pool from "../db/pool.js";
import { authenticateToken, requireAdmin } from "../Middleware/auth.js";

const router = express.Router();

router.post("/", authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { name, street_add1, street_add2, state, city, zip_code, phone } =
      req.body;

    // Check for missing fields
    if (!name || !street_add1 || !state || !city || !zip_code || !phone) {
      return res.status(400).json({
        error: "Missing required fields",
      });
    }
    const result = await pool.query(
      `INSERT INTO customers (name, street_add1, street_add2, state, city, zip_code, phone)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *`,
      [name, street_add1, street_add2, state, city, zip_code, phone],
    );

    res.status(201).json({
      message: "Customer created successfully",
      customer: result.rows[0],
    });
  } catch (err) {
    console.error("Create customer error:", err);
    res.status(500).json({ error: "Server error creating customer" });
  }
});

// Return all customers in database
router.get("/", authenticateToken, requireAdmin, async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT * FROM customers ORDER BY name ASC`,
    );

    res.json({
      message: "Customers retrieved successfully",
      customers: result.rows,
    });
  } catch (err) {
    console.error("Get customers error:", err);
    res.status(500).json({ error: "Server error retrieving customer" });
  }
});

// Return customer info for selected customer
router.get("/:id", authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query("SELECT * FROM customers WHERE id = $1", [
      id,
    ]);

    res.json({
      message: "Customer retrieved successfully!",
      customers: result.rows,
    });
  } catch (err) {
    console.error("Get customer error:", err);
    res.status(500).json({ error: "Server error retrieving customer" });
  }
});

// Update one or more parts of selected customer's info
router.patch("/:id", authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { name, street_add1, street_add2, state, city, zip_code, phone } =
      req.body;

    // Build dynamic update
    const updates = [];
    const values = [];
    let paramCount = 1;

    // Check for empty fields
    if (name !== undefined) {
      updates.push(`name = $${paramCount}`);
      values.push(name);
      paramCount++;
    }
    if (street_add1 !== undefined) {
      updates.push(`street_add1 = $${paramCount}`);
      values.push(street_add1);
      paramCount++;
    }
    if (street_add2 !== undefined) {
      updates.push(`street_add2 = $${paramCount}`);
      values.push(street_add2);
      paramCount++;
    }
    if (state !== undefined) {
      updates.push(`state = $${paramCount}`);
      values.push(state);
      paramCount++;
    }
    if (city !== undefined) {
      updates.push(`city = $${paramCount}`);
      values.push(city);
      paramCount++;
    }
    if (zip_code !== undefined) {
      updates.push(`zip_code = $${paramCount}`);
      values.push(zip_code);
      paramCount++;
    }
    if (phone !== undefined) {
      updates.push(`phone = $${paramCount}`);
      values.push(phone);
      paramCount++;
    }

    if (updates.length === 0) {
      return res.status(400).json({ error: "No fields to update" });
    }

    values.push(id);

    const result = await pool.query(
      `UPDATE customers SET ${updates.join(",")} WHERE id = $${paramCount} RETURNING *`,
      values,
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Customer not found" });
    }

    res.json({
      message: "Customer updated successfully",
      customer: result.rows[0],
    });
  } catch (err) {
    console.error("Update customer error:", err);
    res.status(500).json({ error: "Server error updating customer" });
  }
});

// Delete customer from database
router.delete("/:id", authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "DELETE FROM customers WHERE id = $1 RETURNING *",
      [id],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Customer not found" });
    }

    res.json({
      message: "Customer deleted successfully",
      deletedCustomer: result.rows[0],
    });
  } catch (err) {
    console.error("Delete customer error:", err);
    res.status(500).json({ error: "Server error deleting customer" });
  }
});
export default router;
