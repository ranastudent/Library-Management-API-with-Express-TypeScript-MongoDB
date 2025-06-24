"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = require("./app");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI ||
    "mongodb+srv://todosDB:todosDB@cluster0.kt8jb.mongodb.net/libary-management-app?retryWrites=true&w=majority&appName=Cluster0";
const start = async () => {
    try {
        await mongoose_1.default.connect(MONGO_URI);
        console.log("✅ Connected to MongoDB");
        app_1.app.listen(PORT, () => {
            console.log(`🚀 Server is running at http://localhost:${PORT}`);
        });
    }
    catch (err) {
        console.error("❌ Failed to connect", err);
        process.exit(1);
    }
};
start();
