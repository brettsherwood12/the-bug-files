import { Router } from "express";
import { pool } from "../db";

const router = Router();

router.post("/add", async (req, res) => {
  try {
    const { name, description, userId } = req.body;
    const project = await pool.query(
      "INSERT INTO projects (user_id, name, description) VALUES($1, $2, $3) RETURNING *",
      [userId, name, description]
    );
    res.json(project.rows[0]);
  } catch (error) {
    console.log(error);
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const projects = await pool.query("SELECT * FROM projects WHERE user_id = $1", [id]);
    res.json(projects.rows);
  } catch (error) {
    console.log(error);
  }
});

router.get("/:id", async (req, res) => {});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;
    await pool.query("UPDATE projects SET name = $2, description = $3, WHERE id = $1", [id, name, description]);
    res.json({ edited: true });
  } catch (error) {
    console.log(error);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM projects WHERE id = $1", [id]);
    res.json({ deletedId: id });
  } catch (error) {
    console.log(error);
  }
});

export default router;
