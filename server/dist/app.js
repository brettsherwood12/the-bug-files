"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
//import userRouter from "./routes/userRouter";
//import commentRouter from "./routes/commentRouter";
var projectRouter_1 = __importDefault(require("./routes/projectRouter"));
//import bugRouter from "./routes/bugRouter";
var app = express_1.default();
// middleware
app.use(cors_1.default({
    origin: process.env.CLIENT_APP_URL
}));
app.use(express_1.default.json());
//routers
//app.use("/users", userRouter);
app.use("/projects", projectRouter_1.default);
//app.use("/comments", commentRouter);
//app.use("/bugs", bugRouter);
exports.default = app;
