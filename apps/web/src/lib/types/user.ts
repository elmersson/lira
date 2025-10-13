import { z } from "zod";
import { emoji } from "@/lib/validation/shared";

// Constants for validation
const COGNITO_ID_MIN_LENGTH = 1;
const USERNAME_MIN_LENGTH = 3;
const USERNAME_MAX_LENGTH = 50;
const TEAM_ID_MIN = 1;

// User type definition
export type User = {
  userId: number;
  cognitoId: string;
  username: string;
  emoji?: string;
  profilePictureUrl?: string;
  teamId?: number;
  team?: {
    id: number;
    teamName: string;
    emoji?: string;
  };
  authoredTasks?: Array<{
    id: number;
    title: string;
  }>;
  assignedTasks?: Array<{
    id: number;
    title: string;
  }>;
};

// Zod schemas for form validation
export const createUserSchema = z.object({
  cognitoId: z
    .string()
    .min(COGNITO_ID_MIN_LENGTH, "Cognito ID is required")
    .trim(),
  username: z
    .string()
    .min(USERNAME_MIN_LENGTH, "Username must be at least 3 characters")
    .max(USERNAME_MAX_LENGTH, "Username must not exceed 50 characters")
    .trim(),
  emoji,
  profilePictureUrl: z
    .string()
    .url("Invalid URL format")
    .optional()
    .or(z.literal("")),
  teamId: z.number().min(TEAM_ID_MIN).optional(),
});

export const updateUserSchema = createUserSchema.partial();

export type CreateUserForm = z.infer<typeof createUserSchema>;
export type UpdateUserForm = z.infer<typeof updateUserSchema>;
