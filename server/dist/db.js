"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pool = void 0;
var pg_1 = require("pg");
exports.pool = new pg_1.Pool({
    user: process.env.POSTGRE_USERNAME,
    password: process.env.POSTGRE_PASSWORD,
    port: Number(process.env.POSTGRE_PORT),
    database: "bug-tracker"
});
