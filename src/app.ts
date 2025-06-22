// src/app.ts
import express, { Application, Request, Response } from "express";
import cors from "cors";
import bookRoutes from "./app/routes/book.route";


export const app: Application = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/api/books', bookRoutes);

// Default route (you can remove this later)
app.get("/", (req: Request, res: Response) => {
  res.send("📚 Library Management API is working!");
});
