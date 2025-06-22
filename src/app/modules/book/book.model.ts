import { Schema, model } from 'mongoose';
import { BookInstanceMethods, IBook } from '../../interfaces/book.interface';

import { Model } from 'mongoose';

const bookSchema = new Schema<IBook>(
  {
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
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

bookSchema.method("updateAvailabilityIfNeeded", function () {
  if (this.copies === 0) {
    this.available = false;
  }
});


export const Book = model<IBook, Model<IBook, object, object, BookInstanceMethods>>(
  "Book",
  bookSchema
);


