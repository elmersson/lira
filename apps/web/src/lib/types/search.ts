import { z } from "zod";

// Constants
const MIN_SEARCH_LENGTH = 2;
const MIN_LIMIT = 1;
const MAX_LIMIT = 100;
const DEFAULT_LIMIT = 20;
const MIN_OFFSET = 0;

// Search result types
export type SearchProject = {
  id: number;
  name: string;
  description?: string;
  tasks?: Array<{ id: number }>;
};

export type SearchTask = {
  id: number;
  title: string;
  description?: string;
  project?: {
    name: string;
  };
  author?: {
    username: string;
  };
  assignee?: {
    username: string;
  };
};

export type SearchUser = {
  userId: number;
  username: string;
  cognitoId: string;
  team?: {
    teamName: string;
  };
};

export type SearchTeam = {
  id: number;
  teamName: string;
  user?: Array<{ userId: number }>;
  projectTeams?: Array<{ id: number }>;
};

export type SearchResults = {
  projects?: SearchProject[];
  tasks?: SearchTask[];
  users?: SearchUser[];
  teams?: SearchTeam[];
  total: number;
};

export type SearchResponse = {
  results: SearchResults;
};

export type SuggestionsResponse = {
  suggestions: string[];
};

// Form schemas
export const searchQuerySchema = z.object({
  q: z
    .string()
    .min(MIN_SEARCH_LENGTH, "Search query must be at least 2 characters"),
  type: z.enum(["all", "projects", "tasks", "users", "teams"]).default("all"),
  limit: z.number().min(MIN_LIMIT).max(MAX_LIMIT).default(DEFAULT_LIMIT),
  offset: z.number().min(MIN_OFFSET).default(MIN_OFFSET),
});

export const suggestionsQuerySchema = z.object({
  q: z.string().min(MIN_SEARCH_LENGTH, "Query must be at least 2 characters"),
});

export type SearchQuery = z.infer<typeof searchQuerySchema>;
export type SuggestionsQuery = z.infer<typeof suggestionsQuerySchema>;

// Search types for UI
export type SearchType = "all" | "projects" | "tasks" | "users" | "teams";

export const SEARCH_TYPES: Array<{ value: SearchType; label: string }> = [
  { value: "all", label: "All" },
  { value: "projects", label: "Projects" },
  { value: "tasks", label: "Tasks" },
  { value: "users", label: "Users" },
  { value: "teams", label: "Teams" },
];
