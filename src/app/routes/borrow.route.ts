import express from "express";
import { borrowBook, getBorrowSummary } from "../controllers/borrow.controller";


const borrowRoutes = express.Router();

borrowRoutes.post('/', borrowBook);

borrowRoutes.get('/', getBorrowSummary);


export default borrowRoutes;