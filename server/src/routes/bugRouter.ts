import { Router } from "express";
import { pool } from "../db";

const router = Router();

router.post("/add", async (req, res) => {
  try {
    const { projectId, description } = req.body;
    const data = await pool.query("INSERT INTO bugs (project_id, description) VALUES($1, $2) RETURNING *", [
      projectId,
      description
    ]);
    res.json(data.rows[0]);
  } catch (error) {
    console.log(error);
  }
});

router.get("/get/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const data = await pool.query("SELECT * from bugs WHERE project_id = $1", [id]);
    res.json(data.rows);
  } catch (error) {
    console.log(error);
  }
});

router.put("/status", async (req, res) => {
  console.log(req.body);
  const { id, status } = req.body;
  try {
    const data = await pool.query("UPDATE bugs SET status = $2 WHERE id = $1 RETURNING *", [id, status]);
    res.json(data.rows[0]);
  } catch (error) {
    console.log(error);
  }
});

router.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM bugs WHERE id = $1", [id]);
    res.json({ deleted: true });
  } catch (error) {
    console.log(error);
  }
});

router.put("/comment", async (req, res) => {
  const { id, comment } = req.body;
  try {
    const data = await pool.query("UPDATE bugs SET comments = array_append(comments, $2) WHERE id = $1 RETURNING *", [
      id,
      comment
    ]);
    res.json(data.rows[0]);
  } catch (error) {
    console.log(error);
  }
});

export default router;
