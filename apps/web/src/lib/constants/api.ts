export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000",
  ENDPOINTS: {
    PROJECTS: "/projects",
    TASKS: "/tasks",
    TEAMS: "/teams",
    USERS: "/users",
    SEARCH: "/search",
  },
} as const;

export const QUERY_KEYS = {
  PROJECTS: ["projects"],
  TASKS: ["tasks"],
  TEAMS: ["teams"],
  USERS: ["users"],
} as const;
