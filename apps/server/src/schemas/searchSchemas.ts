import { z } from "zod";

// Search query validation schema
export const searchQuerySchema = z.object({
  q: z
    .string()
    .min(1, "Search query is required")
    .max(200, "Search query must not exceed 200 characters")
    .trim(),

  type: z
    .enum(["all", "projects", "tasks", "users", "teams"], {
      message: "Type must be one of: all, projects, tasks, users, teams",
    })
    .optional()
    .default("all"),

  limit: z
    .string()
    .regex(/^\d+$/, "Limit must be a number")
    .transform((val) => Number.parseInt(val, 10))
    .refine((val) => val > 0 && val <= 100, "Limit must be between 1 and 100")
    .optional()
    .default("20"),

  offset: z
    .string()
    .regex(/^\d+$/, "Offset must be a number")
    .transform((val) => Number.parseInt(val, 10))
    .refine((val) => val >= 0, "Offset must be non-negative")
    .optional()
    .default("0"),
});

// Type inference from schema
export type SearchQuery = z.infer<typeof searchQuerySchema>;
