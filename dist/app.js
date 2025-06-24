"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
// src/app.ts
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const book_route_1 = __importDefault(require("./app/routes/book.route"));
const borrow_route_1 = __importDefault(require("./app/routes/borrow.route"));
exports.app = (0, express_1.default)();
// Middleware  fd
exports.app.use((0, cors_1.default)());
exports.app.use(express_1.default.json());
exports.app.use('/api/books', book_route_1.default);
exports.app.use('/api/borrow', borrow_route_1.default);
// Default route (you can remove this later)
exports.app.get("/", (req, res) => {
    res.send("📚 Library Management API is working!");
});
