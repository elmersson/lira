import { z } from "zod";

// Constants for validation
const TEAM_NAME_MIN_LENGTH = 3;

// Zod schemas for form validation
export const createTeamSchema = z.object({
  teamName: z
    .string()
    .min(TEAM_NAME_MIN_LENGTH, "Team name must be at least 3 characters"),
  productOwnerUserId: z.number().optional(),
  projectManagerUserId: z.number().optional(),
});

export const updateTeamSchema = createTeamSchema.partial();

export type CreateTeamForm = z.infer<typeof createTeamSchema>;
export type UpdateTeamForm = z.infer<typeof updateTeamSchema>;

export type Team = {
  id: number;
  teamName: string;
  productOwnerUserId?: number | null;
  projectManagerUserId?: number | null;
  createdAt: string;
  updatedAt: string;
};

export type TeamResponse = {
  teams: Team[];
};
