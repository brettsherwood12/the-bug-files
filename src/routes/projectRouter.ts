import { Router } from "express";
import { pool } from "../db";

const router = Router();

router.post("/add", async (req, res) => {
  const { name, description, userId } = req.body;
  try {
    const data = await pool.query("INSERT INTO projects (user_id, name, description) VALUES($1, $2, $3) RETURNING *", [
      userId,
      name,
      description
    ]);
    res.json(data.rows[0]);
  } catch (error) {
    console.log(error);
  }
});

router.get("/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const data = await pool.query("SELECT * FROM projects WHERE user_id = $1", [userId]);
    res.json(data.rows);
  } catch (error) {
    console.log(error);
  }
});

router.put("/edit", async (req, res) => {
  const { id, name, description } = req.body;
  try {
    const data = await pool.query("UPDATE projects SET name = $2, description = $3 WHERE id = $1", [
      id,
      name,
      description
    ]);
    res.json(data.rows[0]);
  } catch (error) {
    console.log(error);
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM bugs WHERE project_id = $1", [id]);
    await pool.query("DELETE FROM projects WHERE id = $1", [id]);
    res.json({});
  } catch (error) {
    console.log(error);
  }
});

export default router;
