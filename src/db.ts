import { Pool } from "pg";

export const pool = new Pool({
  user: process.env.POSTGRE_USERNAME,
  password: process.env.POSTGRE_PASSWORD,
  port: Number(process.env.POSTGRE_PORT),
  database: "the_bug_files"
});
