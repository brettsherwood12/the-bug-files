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

router.put("/status/edit", async (req, res) => {
  const { id, status } = req.body;
  try {
    const data = await pool.query("UPDATE bugs SET status = $2 WHERE id = $1 RETURNING *", [id, status]);
    res.json(data.rows[0]);
  } catch (error) {
    console.log(error);
  }
});

router.put("/description/edit", async (req, res) => {
  console.log(req.body);
  const { id, description } = req.body;
  try {
    const data = await pool.query("UPDATE bugs SET description = $2 WHERE id = $1 RETURNING *", [id, description]);
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

router.put("/comment/add", async (req, res) => {
  const { bugId, comment } = req.body;
  try {
    const data = await pool.query("UPDATE bugs SET comments = array_append(comments, $2) WHERE id = $1 RETURNING *", [
      bugId,
      comment
    ]);
    res.json(data.rows[0]);
  } catch (error) {
    console.log(error);
  }
});

router.put("/comment/delete", async (req, res) => {
  const { bugId, comment } = req.body;
  try {
    const data = await pool.query("UPDATE bugs SET comments = array_remove(comments, $2) WHERE id = $1 RETURNING *", [
      bugId,
      comment
    ]);
    res.json(data.rows[0]);
  } catch (error) {
    console.log(error);
  }
});

export default router;
