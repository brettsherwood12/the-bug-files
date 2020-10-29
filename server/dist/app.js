"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var projectRouter_1 = __importDefault(require("./routes/projectRouter"));
var bugRouter_1 = __importDefault(require("./routes/bugRouter"));
var userRouter_1 = __importDefault(require("./routes/userRouter"));
//import commentRouter from "./routes/commentRouter";
var app = express_1.default();
// middleware
app.use(cors_1.default({
    origin: process.env.CLIENT_APP_URL
}));
app.use(express_1.default.json());
//routers
app.use("/projects", projectRouter_1.default);
app.use("/bugs", bugRouter_1.default);
app.use("/users", userRouter_1.default);
//app.use("/comments", commentRouter);
exports.default = app;
