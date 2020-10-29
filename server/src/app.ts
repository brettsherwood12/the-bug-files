import express from "express";
import cors from "cors";

import projectRouter from "./routes/projectRouter";
import bugRouter from "./routes/bugRouter";
import userRouter from "./routes/userRouter";
//import commentRouter from "./routes/commentRouter";

const app = express();

// middleware
app.use(
  cors({
    origin: process.env.CLIENT_APP_URL
  })
);
app.use(express.json());

//routers
app.use("/projects", projectRouter);
app.use("/bugs", bugRouter);
app.use("/users", userRouter);
//app.use("/comments", commentRouter);

export default app;
