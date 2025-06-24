"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBook = exports.updateBookById = exports.getBookById = exports.getAllBooks = exports.createBook = void 0;
const book_model_1 = require("../modules/book/book.model");
const sendResponse_1 = __importDefault(require("../utils/sendResponse"));
const mongoose_1 = __importDefault(require("mongoose"));
// POST api/books for create book
const createBook = async (req, res) => {
    try {
        const book = await book_model_1.Book.create(req.body);
        res.status(201).json({
            success: true,
            message: "Book created successfully",
            data: {
                _id: book._id,
                title: book.title,
                author: book.author,
                genre: book.genre,
                isbn: book.isbn,
                description: book.description,
                copies: book.copies,
                available: book.available,
                createdAt: book.createdAt,
                updatedAt: book.updatedAt,
            },
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: "Validation failed",
            error,
        });
    }
};
exports.createBook = createBook;
// GET api/books for get all books
const getAllBooks = async (req, res) => {
    try {
        const { filter, sortBy = "createdAt", sort = "asc", limit = "10", } = req.query;
        const query = {};
        if (filter) {
            query.genre = filter;
        }
        const sortOrder = sort === "asc" ? 1 : -1;
        const books = await book_model_1.Book.find(query)
            .sort({ [sortBy]: sortOrder })
            .limit(parseInt(limit));
        res.status(200).json({
            success: true,
            message: "Books retrieved successfully",
            data: books,
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: "Failed to retrieve books",
            error,
        });
    }
};
exports.getAllBooks = getAllBooks;
// GET Book by ID
const getBookById = async (req, res, next) => {
    try {
        const { bookId } = req.params;
        // Validate ObjectId format
        if (!mongoose_1.default.Types.ObjectId.isValid(bookId)) {
            res.status(400).json({
                success: false,
                message: "Invalid book ID format",
                data: null,
            });
            return;
        }
        const book = await book_model_1.Book.findById(bookId);
        if (!book) {
            res.status(404).json({
                success: false,
                message: "Book not found",
                data: null,
            });
            return;
        }
        (0, sendResponse_1.default)(res, {
            statusCode: 200,
            success: true,
            message: "Book retrieved successfully",
            data: book,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getBookById = getBookById;
// UPDATE Book by ID
const updateBookById = async (req, res) => {
    try {
        const { bookId } = req.params;
        const updatedData = req.body;
        const updatedBook = await book_model_1.Book.findByIdAndUpdate(bookId, updatedData, {
            new: true,
            runValidators: true,
        });
        if (!updatedBook) {
            return (0, sendResponse_1.default)(res, {
                statusCode: 404,
                success: false,
                message: "Book not found",
                data: null,
            });
        }
        (0, sendResponse_1.default)(res, {
            statusCode: 200,
            success: true,
            message: "Book updated successfully",
            data: updatedBook,
        });
    }
    catch (error) {
        (0, sendResponse_1.default)(res, {
            statusCode: 500,
            success: false,
            message: "Failed to update book",
            error,
        });
    }
};
exports.updateBookById = updateBookById;
// DELETE Book by ID
const deleteBook = async (req, res, next) => {
    try {
        const bookId = req.params.bookId;
        await book_model_1.Book.findByIdAndDelete(bookId);
        (0, sendResponse_1.default)(res, {
            statusCode: 200,
            success: true,
            message: "Book deleted successfully",
            data: null,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.deleteBook = deleteBook;
