import { z } from "zod";

// Constants for validation limits
const TASK_TITLE_MIN_LENGTH = 1;
const TASK_TITLE_MAX_LENGTH = 200;
const TASK_DESCRIPTION_MAX_LENGTH = 1000;
const TASK_TAGS_MAX_LENGTH = 500;
const TASK_POINTS_MIN = 1;
const TASK_POINTS_MAX = 100;

// Task status enum
const TASK_STATUS = ["todo", "in_progress", "review", "done"] as const;
const TASK_PRIORITY = ["low", "medium", "high", "urgent"] as const;

// Create task validation schema
export const createTaskSchema = z
  .object({
    title: z
      .string()
      .min(TASK_TITLE_MIN_LENGTH, "Task title is required")
      .max(TASK_TITLE_MAX_LENGTH, "Task title must not exceed 200 characters")
      .trim(),

    description: z
      .string()
      .max(
        TASK_DESCRIPTION_MAX_LENGTH,
        "Description must not exceed 1000 characters"
      )
      .trim()
      .optional()
      .or(z.literal("")),

    status: z
      .enum(TASK_STATUS, {
        message: "Status must be one of: todo, in_progress, review, done",
      })
      .optional(),

    priority: z
      .enum(TASK_PRIORITY, {
        message: "Priority must be one of: low, medium, high, urgent",
      })
      .optional(),

    tags: z
      .string()
      .max(TASK_TAGS_MAX_LENGTH, "Tags must not exceed 500 characters")
      .trim()
      .optional()
      .or(z.literal("")),

    startDate: z
      .string()
      .regex(
        /^\d{4}-\d{2}-\d{2}$/,
        "Invalid start date format. Use YYYY-MM-DD format"
      )
      .optional()
      .or(z.literal("")),

    dueDate: z
      .string()
      .regex(
        /^\d{4}-\d{2}-\d{2}$/,
        "Invalid due date format. Use YYYY-MM-DD format"
      )
      .optional()
      .or(z.literal("")),

    points: z
      .number()
      .int("Points must be a whole number")
      .min(TASK_POINTS_MIN, "Points must be at least 1")
      .max(TASK_POINTS_MAX, "Points must not exceed 100")
      .optional(),

    projectId: z
      .number()
      .int("Project ID must be a whole number")
      .positive("Project ID must be positive"),

    authorUserId: z
      .number()
      .int("Author user ID must be a whole number")
      .positive("Author user ID must be positive"),

    assignedUserId: z
      .number()
      .int("Assigned user ID must be a whole number")
      .positive("Assigned user ID must be positive")
      .optional(),
  })
  .refine(
    (data) => {
      // Custom validation: due date should be after start date
      if (data.startDate && data.dueDate) {
        const start = new Date(data.startDate);
        const due = new Date(data.dueDate);
        return due >= start;
      }
      return true;
    },
    {
      message: "Due date must be on or after start date",
      path: ["dueDate"],
    }
  );

// Update task validation schema
export const updateTaskSchema = createTaskSchema.partial();

// Get tasks query schema
export const getTasksQuerySchema = z.object({
  projectId: z
    .string()
    .regex(/^\d+$/, "Project ID must be a number")
    .transform((val) => Number.parseInt(val, 10))
    .optional(),

  status: z.enum(TASK_STATUS).optional(),

  priority: z.enum(TASK_PRIORITY).optional(),

  assignedUserId: z
    .string()
    .regex(/^\d+$/, "Assigned user ID must be a number")
    .transform((val) => Number.parseInt(val, 10))
    .optional(),
});

// Type inference from schemas
export type CreateTaskInput = z.infer<typeof createTaskSchema>;
export type UpdateTaskInput = z.infer<typeof updateTaskSchema>;
export type GetTasksQuery = z.infer<typeof getTasksQuerySchema>;
