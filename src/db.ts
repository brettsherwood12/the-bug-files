import { Pool } from "pg";

let config;

if (process.env.NODE_ENV === "development") {
  config = {
    user: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    port: Number(process.env.DATABASE_PORT),
    database: process.env.DATABASE_NAME
  };
} else {
  config = {
    connectionString: process.env.DATABASE_URL
    //ssl: true
  };
}

export const pool = new Pool(config);
