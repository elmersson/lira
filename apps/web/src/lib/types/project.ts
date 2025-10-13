import { z } from "zod";
import { emoji } from "@/lib/validation/shared";

// Zod schemas for form validation
export const createProjectSchema = z.object({
  name: z.string().min(1, "Name is required"),
  emoji,
  description: z.string().optional().or(z.literal("")),
  startDate: z.string().optional().or(z.literal("")),
  endDate: z.string().optional().or(z.literal("")),
});

export type CreateProjectForm = z.infer<typeof createProjectSchema>;

export type Project = {
  id: number;
  name: string;
  emoji?: string;
  description?: string;
  startDate?: string;
  endDate?: string;
  createdAt: string;
  updatedAt: string;
};

export type ProjectResponse = {
  projects: Project[];
};
