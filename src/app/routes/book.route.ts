import express from 'express';
import { createBook, deleteBook, getAllBooks, getBookById, updateBookById } from '../controllers/book.controller';

const bookRoutes = express.Router();

bookRoutes.post('/', createBook);

bookRoutes.get('/', getAllBooks);

bookRoutes.get('/:bookId', getBookById);

bookRoutes.put('/:bookId', updateBookById);

bookRoutes.delete('/:bookId', deleteBook);

export default bookRoutes;
