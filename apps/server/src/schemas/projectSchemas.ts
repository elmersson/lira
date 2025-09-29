import { z } from "zod";

// Constants for validation limits
const PROJECT_NAME_MIN_LENGTH = 3;
const PROJECT_NAME_MAX_LENGTH = 100;
const DESCRIPTION_MAX_LENGTH = 500;

// Create project validation schema
export const createProjectSchema = z
  .object({
    name: z
      .string()
      .min(1, "Project name is required")
      .min(
        PROJECT_NAME_MIN_LENGTH,
        "Project name must be at least 3 characters long"
      )
      .max(
        PROJECT_NAME_MAX_LENGTH,
        "Project name must not exceed 100 characters"
      )
      .trim(),

    description: z
      .string()
      .max(DESCRIPTION_MAX_LENGTH, "Description must not exceed 500 characters")
      .trim()
      .optional()
      .or(z.literal("")),

    startDate: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid start date format. Use YYYY-MM-DD format")
      .optional()
      .or(z.literal("")),

    endDate: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid end date format. Use YYYY-MM-DD format")
      .optional()
      .or(z.literal("")),
  })
  .refine(
    (data) => {
      // Custom validation: end date should be after start date
      if (data.startDate && data.endDate) {
        const start = new Date(data.startDate);
        const end = new Date(data.endDate);
        return end > start;
      }
      return true;
    },
    {
      message: "End date must be after start date",
      path: ["endDate"],
    }
  );

// Update project validation schema
export const updateProjectSchema = createProjectSchema.partial();

// Type inference from schema
export type CreateProjectInput = z.infer<typeof createProjectSchema>;
export type UpdateProjectInput = z.infer<typeof updateProjectSchema>;
