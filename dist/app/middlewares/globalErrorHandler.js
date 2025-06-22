"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalErrorHandler = void 0;
const globalErrorHandler = (err, req, res) => {
    let statusCode = 500;
    let message = 'Something went wrong!';
    // Zod validation error
    if (err.name === 'ZodError') {
        statusCode = 400;
        message = 'Validation failed';
    }
    // Mongoose validation error
    else if (err.name === 'ValidationError') {
        statusCode = 400;
        message = 'Validation failed';
    }
    // Mongoose CastError
    else if (err.name === 'CastError') {
        statusCode = 400;
        message = `Invalid ${err.path}: ${err.value}`;
    }
    res.status(statusCode).json({
        success: false,
        message,
        error: err, // ✅ using err directly
    });
};
exports.globalErrorHandler = globalErrorHandler;
