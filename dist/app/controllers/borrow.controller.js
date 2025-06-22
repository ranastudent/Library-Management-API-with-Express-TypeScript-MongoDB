"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBorrowSummary = exports.borrowBook = void 0;
const sendResponse_1 = __importDefault(require("../utils/sendResponse"));
const book_model_1 = require("../modules/book/book.model");
const borrow_model_1 = require("../modules/borrow/borrow.model");
// create borrow book
const borrowBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { book: bookId, quantity, dueDate } = req.body;
        // 🔹 Stage 1: Find the book and check availability
        const book = yield book_model_1.Book.findById(bookId);
        if (!book) {
            return (0, sendResponse_1.default)(res, {
                statusCode: 404,
                success: false,
                message: "Book not found",
                error: "Invalid book ID",
            });
        }
        if (book.copies < quantity) {
            return (0, sendResponse_1.default)(res, {
                statusCode: 400,
                success: false,
                message: "Not enough copies available",
                error: `Only ${book.copies} copies left`,
            });
        }
        // 🔹 Stage 2: Update book copies and availability
        book.copies -= quantity;
        book.updateAvailabilityIfNeeded(); // instance method
        yield book.save();
        // 🔹 Save borrow record
        const borrow = yield borrow_model_1.Borrow.create({
            book: book._id,
            quantity,
            dueDate,
        });
        // 🔹 Send response
        (0, sendResponse_1.default)(res, {
            statusCode: 201,
            success: true,
            message: "Book borrowed successfully",
            data: {
                _id: borrow._id,
                book: borrow.book,
                quantity: borrow.quantity,
                dueDate: borrow.dueDate,
                createdAt: borrow.createdAt,
                updatedAt: borrow.updatedAt,
            },
        });
    }
    catch (error) {
        next(error);
    }
});
exports.borrowBook = borrowBook;
// GET All Borrow book
const getBorrowSummary = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield borrow_model_1.Borrow.aggregate([
        {
            $group: {
                _id: "$book", // group by book ID
                totalQuantity: { $sum: "$quantity" }
            }
        },
        {
            $lookup: {
                from: "books", // matches collection name in MongoDB (lowercase plural by default)
                localField: "_id",
                foreignField: "_id",
                as: "bookInfo"
            }
        },
        { $unwind: "$bookInfo" }, // flatten bookInfo array
        {
            $project: {
                _id: 0,
                book: {
                    title: "$bookInfo.title",
                    isbn: "$bookInfo.isbn"
                },
                totalQuantity: 1
            }
        }
    ]);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Borrowed books summary retrieved successfully",
        data: result
    });
});
exports.getBorrowSummary = getBorrowSummary;
