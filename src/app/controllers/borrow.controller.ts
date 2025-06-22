import { Request, Response, NextFunction } from "express";
import sendResponse from "../utils/sendResponse";
import { IBorrow } from "../interfaces/borrow.interface";
import { Book } from "../modules/book/book.model";
import { Borrow } from "../modules/borrow/borrow.model";

// create borrow book
export const borrowBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { book: bookId, quantity, dueDate } = req.body as IBorrow;

    // 🔹 Stage 1: Find the book and check availability
    const book = await Book.findById(bookId);
    if (!book) {
      return sendResponse(res, {
        statusCode: 404,
        success: false,
        message: "Book not found",
        error: "Invalid book ID",
      });
    }

    if (book.copies < quantity) {
      return sendResponse(res, {
        statusCode: 400,
        success: false,
        message: "Not enough copies available",
        error: `Only ${book.copies} copies left`,
      });
    }

    // 🔹 Stage 2: Update book copies and availability
    book.copies -= quantity;
    book.updateAvailabilityIfNeeded(); // instance method
    await book.save();

    // 🔹 Save borrow record
    const borrow = await Borrow.create({
      book: book._id,
      quantity,
      dueDate,
    });

    // 🔹 Send response
    sendResponse(res, {
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
  } catch (error) {
    next(error);
  }
};

// GET All Borrow book

export const getBorrowSummary = async (req: Request, res: Response) => {
  const result = await Borrow.aggregate([
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

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Borrowed books summary retrieved successfully",
    data: result
  });
};