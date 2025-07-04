import { NextFunction, Request, Response } from "express";
import { Book } from "../modules/book/book.model";
import { BookQuery } from "../interfaces/filter.interface";
import sendResponse from "../utils/sendResponse";
import mongoose from "mongoose";

// POST api/books for create book
export const createBook = async (req: Request, res: Response) => {
  try {
    const book = await Book.create(req.body);
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
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Validation failed",
      error,
    });
  }
};

// GET api/books for get all books

export const getAllBooks = async (req: Request, res: Response) => {
  try {
    const {
      filter,
      sortBy = "createdAt",
      sort = "asc",
      limit = "10",
      page = "1",
    } = req.query as {
      filter?: string;
      sortBy?: string;
      sort?: "asc" | "desc";
      limit?: string;
      page?: string;
    };

    const query: BookQuery = {} as BookQuery;

if (filter) {
  const terms = filter.split(" ").filter(Boolean); // e.g., "Reduanul Islam" -> ["Reduanul", "Islam"]

  query.$and = terms.map((term) => ({
    $or: [
      { title: { $regex: term, $options: "i" } },
      { author: { $regex: term, $options: "i" } },
      { genre: { $regex: term, $options: "i" } },
    ],
  }));
}


    const sortOrder = sort === "asc" ? 1 : -1;
    const numericLimit = parseInt(limit);
    const numericPage = parseInt(page);
    const skip = (numericPage - 1) * numericLimit;

    const books = await Book.find(query)
      .sort({ [sortBy]: sortOrder })
      .skip(skip)
      .limit(numericLimit);

    const total = await Book.countDocuments(query);

    res.status(200).json({
      success: true,
      message: "Books retrieved successfully",
      data: {
        meta: {
          page: numericPage,
          limit: numericLimit,
          total,
        },
        books,
      },
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to retrieve books",
      error,
    });
  }
};


// GET Book by ID

export const getBookById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { bookId } = req.params;

    // Validate ObjectId format
    if (!mongoose.Types.ObjectId.isValid(bookId)) {
      res.status(400).json({
        success: false,
        message: "Invalid book ID format",
        data: null,
      });
      return;
    }

    const book = await Book.findById(bookId);

    if (!book) {
      res.status(404).json({
        success: false,
        message: "Book not found",
        data: null,
      });
      return;
    }

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Book retrieved successfully",
      data: book,
    });
  } catch (error) {
    next(error);
  }
};

// UPDATE Book by ID

export const updateBookById = async (req: Request, res: Response) => {
  try {
    const { bookId } = req.params;
    const updatedData = req.body;

    const updatedBook = await Book.findByIdAndUpdate(bookId, updatedData, {
      new: true,
      runValidators: true,
    });

    if (!updatedBook) {
      return sendResponse(res, {
        statusCode: 404,
        success: false,
        message: "Book not found",
        data: null,
      });
    }

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Book updated successfully",
      data: updatedBook,
    });
  } catch (error) {
    sendResponse(res, {
      statusCode: 500,
      success: false,
      message: "Failed to update book",
      error,
    });
  }
};

// DELETE Book by ID

export const deleteBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const bookId = req.params.bookId;

    await Book.findByIdAndDelete(bookId);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Book deleted successfully",
      data: null,
    });
  } catch (error) {
    next(error);
  }
};
