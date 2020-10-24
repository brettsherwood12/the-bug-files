import express from "express";
import cors from "cors";

//import userRouter from "./routes/userRouter";
//import commentRouter from "./routes/commentRouter";
import projectRouter from "./routes/projectRouter";
//import bugRouter from "./routes/bugRouter";

const app = express();

// middleware
app.use(
  cors({
    origin: process.env.CLIENT_APP_URL
  })
);
app.use(express.json());

//routers
//app.use("/users", userRouter);
app.use("/projects", projectRouter);
//app.use("/comments", commentRouter);
//app.use("/bugs", bugRouter);

export default app;
