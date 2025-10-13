import { z } from "zod";
import { emoji } from "@/lib/validation/shared";

// Constants for validation
const TITLE_MIN_LENGTH = 1;
const DESCRIPTION_MIN_LENGTH = 1;
const POINTS_MIN = 1;
const POINTS_MAX = 100;
const PROJECT_ID_MIN = 1;
const USER_ID_MIN = 1;

// Task status and priority enums
export const TASK_STATUSES = [
  { value: "todo", label: "To Do" },
  { value: "in_progress", label: "In Progress" },
  { value: "review", label: "Review" },
  { value: "done", label: "Done" },
] as const;

export const TASK_PRIORITIES = [
  { value: "low", label: "Low" },
  { value: "medium", label: "Medium" },
  { value: "high", label: "High" },
  { value: "urgent", label: "Urgent" },
] as const;

// Constants for form dropdowns
export const TASK_STATUS_OPTIONS = [
  "todo",
  "in_progress",
  "review",
  "done",
] as const;
export const TASK_PRIORITY_OPTIONS = [
  "low",
  "medium",
  "high",
  "urgent",
] as const;

export type TaskStatus = "todo" | "in_progress" | "review" | "done";
export type TaskPriority = "low" | "medium" | "high" | "urgent";

// Task type definition
export type Task = {
  id: number;
  title: string;
  emoji?: string;
  description?: string;
  status: TaskStatus;
  statusEmoji?: string;
  priority: TaskPriority;
  priorityEmoji?: string;
  tags?: string;
  startDate?: string;
  dueDate?: string;
  points?: number;
  projectId: number;
  authorUserId: number;
  assignedUserId?: number;
  createdAt: string;
  updatedAt: string;
  project?: {
    id: number;
    name: string;
  };
  author?: {
    userId: number;
    username: string;
  };
  assignee?: {
    userId: number;
    username: string;
  };
};

// Zod schemas for form validation
export const createTaskSchema = z.object({
  title: z.string().min(TITLE_MIN_LENGTH, "Title is required"),
  emoji,
  description: z
    .string()
    .min(DESCRIPTION_MIN_LENGTH)
    .optional()
    .or(z.literal("")),
  status: z.enum(["todo", "in_progress", "review", "done"]).default("todo"),
  statusEmoji: emoji,
  priority: z.enum(["low", "medium", "high", "urgent"]).default("medium"),
  priorityEmoji: emoji,
  tags: z.string().optional().or(z.literal("")),
  startDate: z.string().optional().or(z.literal("")),
  dueDate: z.string().optional().or(z.literal("")),
  points: z.number().min(POINTS_MIN).max(POINTS_MAX).optional(),
  projectId: z.number().min(PROJECT_ID_MIN, "Project ID is required"),
  authorUserId: z.number().min(USER_ID_MIN, "Author user ID is required"),
  assignedUserId: z.number().min(USER_ID_MIN).optional(),
});

export const updateTaskSchema = createTaskSchema.partial();

export type CreateTaskForm = z.infer<typeof createTaskSchema>;
export type UpdateTaskForm = z.infer<typeof updateTaskSchema>;
