import { Router } from "express";
import bcryptjs from "bcryptjs";
import { pool } from "../db";

const router = Router();

router.post("/sign-up", async (req, res) => {
  const { username, password } = req.body;
  try {
    const passwordHash = await bcryptjs.hash(password, 10);
    const user = await pool.query("INSERT INTO users (username, password_hash) VALUES($1, $2) RETURNING *", [
      username,
      passwordHash
    ]);
    res.json(user.rows[0]);
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
    //req.session.user = user._id;
    res.json({ id: user.id, username: user.username });
  } catch (error) {
    console.log(error);
  }
});

router.get("/:id", async (req, res) => {});

router.put("/:id", async (req, res) => {});

router.delete("/:id", async (req, res) => {});

export default router;
