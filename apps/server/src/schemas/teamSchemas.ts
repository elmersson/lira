import { z } from "zod";

// Constants for validation limits
const TEAM_NAME_MIN_LENGTH = 3;
const TEAM_NAME_MAX_LENGTH = 100;

// Create team validation schema
export const createTeamSchema = z.object({
  teamName: z
    .string()
    .min(TEAM_NAME_MIN_LENGTH, "Team name must be at least 3 characters long")
    .max(TEAM_NAME_MAX_LENGTH, "Team name must not exceed 100 characters")
    .trim(),

  productOwnerUserId: z
    .number()
    .int("Product owner user ID must be a whole number")
    .positive("Product owner user ID must be positive")
    .optional(),

  projectManagerUserId: z
    .number()
    .int("Project manager user ID must be a whole number")
    .positive("Project manager user ID must be positive")
    .optional(),
});

// Update team validation schema
export const updateTeamSchema = createTeamSchema.partial();

// Update the query schema to handle number IDs:
export const getTeamsQuerySchema = z.object({
  teamName: z.string().min(1, "Team name must not be empty").optional(),

  productOwnerUserId: z
    .number()
    .int("Product owner user ID must be a whole number")
    .positive("Product owner user ID must be positive")
    .optional(),

  projectManagerUserId: z
    .number()
    .int("Project manager user ID must be a whole number")
    .positive("Project manager user ID must be positive")
    .optional(),
});

// Type inference from schemas
export type CreateTeamInput = z.infer<typeof createTeamSchema>;
export type UpdateTeamInput = z.infer<typeof updateTeamSchema>;
export type GetTeamsQuery = z.infer<typeof getTeamsQuerySchema>;
