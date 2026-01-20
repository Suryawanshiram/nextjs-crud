import { z } from "zod";

export const getTodosQuerySchema = z.object({
  page: z
    .string()
    .optional()
    .transform((v) => (v ? Number(v) : 1))
    .refine((v) => v > 0, { message: "page must be > 0" }),

  limit: z
    .string()
    .optional()
    .transform((v) => (v ? Number(v) : 10))
    .refine((v) => v > 0 && v <= 50, {
      message: "limit must be between 1 and 50",
    }),

  completed: z
    .string()
    .optional()
    .transform((v) => {
      if (v === "true") return true;
      if (v === "false") return false;
      return undefined;
    }),
});

export const createTodoSchema = z.object({
  title: z.string().min(3).max(100).trim(),
  description: z.string().max(500).trim().optional(),
});

export const updateTodoSchema = z
  .object({
    title: z.string().min(3).max(100).trim(),
    description: z.string().max(500).trim().optional(),
    completed: z.boolean(),
  })
  .partial()
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field must be updated",
  });
