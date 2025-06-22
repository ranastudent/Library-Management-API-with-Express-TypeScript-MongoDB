"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Book = void 0;
const mongoose_1 = require("mongoose");
const bookSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    author: {
        type: String,
        required: true,
        trim: true,
    },
    genre: {
        type: String,
        enum: ['FICTION', 'NON_FICTION', 'SCIENCE', 'HISTORY', 'BIOGRAPHY', 'FANTASY'],
        required: true,
    },
    isbn: {
        type: String,
        unique: true,
        required: true,
        trim: true,
    },
    description: {
        type: String,
    },
    copies: {
        type: Number,
        required: true,
        min: [0, 'Copies must be a positive number'],
    },
    available: {
        type: Boolean,
        default: true,
    },
}, {
    timestamps: true,
    versionKey: false,
});
bookSchema.method("updateAvailabilityIfNeeded", function () {
    if (this.copies === 0) {
        this.available = false;
    }
});
exports.Book = (0, mongoose_1.model)("Book", bookSchema);
