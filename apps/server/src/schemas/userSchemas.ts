import { z } from "zod";

// Constants for validation limits
const USERNAME_MIN_LENGTH = 3;
const USERNAME_MAX_LENGTH = 50;
const COGNITO_ID_MIN_LENGTH = 1;
const COGNITO_ID_MAX_LENGTH = 100;
const PROFILE_PICTURE_URL_MAX_LENGTH = 500;

// Create user validation schema
export const createUserSchema = z.object({
  cognitoId: z
    .string()
    .min(COGNITO_ID_MIN_LENGTH, "Cognito ID is required")
    .max(COGNITO_ID_MAX_LENGTH, "Cognito ID must not exceed 100 characters")
    .trim(),

  username: z
    .string()
    .min(USERNAME_MIN_LENGTH, "Username must be at least 3 characters long")
    .max(USERNAME_MAX_LENGTH, "Username must not exceed 50 characters")
    .trim(),

  profilePictureUrl: z
    .string()
    .url("Profile picture URL must be a valid URL")
    .max(
      PROFILE_PICTURE_URL_MAX_LENGTH,
      "Profile picture URL must not exceed 500 characters"
    )
    .trim()
    .optional()
    .or(z.literal("")),

  teamId: z
    .number()
    .int("Team ID must be a whole number")
    .positive("Team ID must be positive")
    .optional(),
});

// Update user validation schema
export const updateUserSchema = createUserSchema.partial();

// Update the query schema:
export const getUsersQuerySchema = z.object({
  teamId: z
    .number()
    .int("Team ID must be a whole number")
    .positive("Team ID must be positive")
    .optional(),

  username: z.string().min(1, "Username must not be empty").optional(),
});

// Type inference from schemas
export type CreateUserInput = z.infer<typeof createUserSchema>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;
export type GetUsersQuery = z.infer<typeof getUsersQuerySchema>;
