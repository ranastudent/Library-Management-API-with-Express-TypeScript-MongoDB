import { z } from "zod";

export const createBookZodSchema = z.object({
  title: z.string({
    required_error: "Title is required",
  }),

  author: z.string({
    required_error: "Author is required",
  }),

  genre: z.enum(
    ["FICTION", "NON_FICTION", "SCIENCE", "HISTORY", "BIOGRAPHY", "FANTASY"],
    {
      required_error: "Genre is required",
    }
  ),
  isbn: z.string({
    required_error: "ISBN is required",
  }),
  description: z.string().optional(),
  copies: z
    .number({
      required_error: "Copies is required",
    })
    .min(0, "Copies must be a non-negative number"),
  available: z.boolean().optional(),
});
