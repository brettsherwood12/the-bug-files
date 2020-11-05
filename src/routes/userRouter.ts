import { Router } from "express";
import bcryptjs from "bcryptjs";
import { pool } from "../db";

const router = Router();

router.post("/sign-up", async (req, res) => {
  const { username, password } = req.body;
  try {
    const passwordHash = await bcryptjs.hash(password, 10);
    const data = await pool.query("INSERT INTO users (username, password_hash) VALUES($1, $2) RETURNING *", [
      username,
      passwordHash
    ]);
    res.json(data.rows[0]);
  } catch (error) {
    console.log(error);
  }
});

router.post("/sign-in", async (req, res) => {
  const { username, password } = req.body;
  try {
    const response = await pool.query("SELECT * FROM users WHERE username = $1", [username]);
    if (!response) throw new Error("No user found with that email.");
    const user = response.rows[0];
    const result = await bcryptjs.compare(password, user.password_hash);
    if (!result) throw new Error("Wrong password.");
    res.json({ id: user.id, username: user.username });
  } catch (error) {
    console.log(error);
  }
});

export default router;
