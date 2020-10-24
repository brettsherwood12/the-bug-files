"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var app_1 = __importDefault(require("./app"));
var PORT = process.env.PORT;
// in production this will serve static files
app_1.default.get("/", function (req, res) {
    res.json({ response: true });
});
app_1.default.listen(PORT, function () {
    console.log("Server listening on port " + PORT);
});
