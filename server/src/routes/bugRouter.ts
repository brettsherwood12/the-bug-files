import { Router } from "express";
import { pool } from "../db";

const router = Router();

router.post("/add", async (req, res) => {
  try {
    const { projectId, description } = req.body;
    const project = await pool.query("INSERT INTO bugs (project_id, description) VALUES($1, $2) RETURNING *", [
      projectId,
      description
    ]);
    res.json(project.rows[0]);
  } catch (error) {
    console.log(error);
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const bugs = await pool.query("SELECT * from bugs WHERE project_id = $1", [id]);
    res.json(bugs.rows);
  } catch (error) {
    console.log(error);
  }
});

router.put("/:id", async (req, res) => {});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM bugs WHERE id = $1", [id]);
    res.json({ deleted: true });
  } catch (error) {
    console.log(error);
  }
});

export default router;
