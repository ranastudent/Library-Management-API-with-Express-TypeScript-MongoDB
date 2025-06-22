import mongoose from "mongoose";
import { app } from "./app";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 5000;
const MONGO_URI =
  process.env.MONGO_URI ||
  "mongodb+srv://todosDB:todosDB@cluster0.kt8jb.mongodb.net/libary-management-app?retryWrites=true&w=majority&appName=Cluster0";

const start = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ Connected to MongoDB");

    app.listen(PORT, () => {
      console.log(`🚀 Server is running at http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("❌ Failed to connect", err);
    process.exit(1);
  }
};

start();
