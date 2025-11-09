import { Router } from "express";
import { pool } from "../db.js";

const router = Router();

function toMySQLDateTime(value) {
  if (!value) return null;
  const d = new Date(value);
  if (isNaN(d)) return null;
  const pad = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())} ` +
         `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
}


// GET all
router.get("/", async (_req, res) => {
  const [rows] = await pool.query("SELECT * FROM events ORDER BY starts_at DESC");
  res.json(rows);
});

// GET one
router.get("/:id", async (req, res) => {
  const [rows] = await pool.query("SELECT * FROM events WHERE id = ?", [req.params.id]);
  if (rows.length === 0) return res.status(404).json({ error: "Not found" });
  res.json(rows[0]);
});

// CREATE
router.post("/", async (req, res) => {
  const { title, description, location, starts_at, ends_at } = req.body;
  if (!title || !starts_at) return res.status(400).json({ error: "title and starts_at are required" });

  const s = toMySQLDateTime(starts_at);
  const e = toMySQLDateTime(ends_at);

  const [result] = await pool.query(
    "INSERT INTO events (title, description, location, starts_at, ends_at) VALUES (?, ?, ?, ?, ?)",
    [title, description ?? null, location ?? null, s, e]
  );
  const [rows] = await pool.query("SELECT * FROM events WHERE id = ?", [result.insertId]);
  res.status(201).json(rows[0]);
});

// UPDATE
router.put("/:id", async (req, res) => {
  const { title, description, location, starts_at, ends_at } = req.body;

  const s = toMySQLDateTime(starts_at);
  const e = toMySQLDateTime(ends_at);

  const [result] = await pool.query(
    `UPDATE events SET title = ?, description = ?, location = ?, starts_at = ?, ends_at = ?
     WHERE id = ?`,
    [title, description ?? null, location ?? null, s, e, req.params.id]
  );
  if (result.affectedRows === 0) return res.status(404).json({ error: "Not found" });
  const [rows] = await pool.query("SELECT * FROM events WHERE id = ?", [req.params.id]);
  res.json(rows[0]);
});


// DELETE
router.delete("/:id", async (req, res) => {
  const [result] = await pool.query("DELETE FROM events WHERE id = ?", [req.params.id]);
  if (result.affectedRows === 0) return res.status(404).json({ error: "Not found" });
  res.status(204).send();
});

export default router;
