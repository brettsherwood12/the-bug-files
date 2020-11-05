import express from "express";
import cors from "cors";
import { join } from "path";

import projectRouter from "./routes/projectRouter";
import bugRouter from "./routes/bugRouter";
import userRouter from "./routes/userRouter";

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_APP_URL
  })
);

app.use(express.static(join(__dirname, "build")));

app.use(express.json());

app.use("/projects", projectRouter);
app.use("/bugs", bugRouter);
app.use("/users", userRouter);

export default app;
