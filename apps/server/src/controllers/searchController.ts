import type { Request, Response } from "express";
import { ZodError } from "zod";
import { PrismaClient } from "../../prisma/generated/client";
import { formatValidationErrors, HTTP_STATUS } from "../helpers";
import { searchQuerySchema } from "../schemas/searchSchemas";

const prisma = new PrismaClient();

// Constants
const SEARCH_TIMEOUT = 1000;

// Types for search results
type ProjectResult = {
  id: number;
  name: string;
  description: string | null;
  startDate: Date | null;
  endDate: Date | null;
  tasks: Array<{
    id: number;
    title: string;
    status: string | null;
  }>;
};

type TaskResult = {
  id: number;
  title: string;
  description: string | null;
  status: string | null;
  priority: string | null;
  project: {
    id: number;
    name: string;
  };
  author: {
    userId: number;
    username: string;
  };
  assignee: {
    userId: number;
    username: string;
  } | null;
};

type UserResult = {
  userId: number;
  username: string;
  cognitoId: string;
  team: {
    id: number;
    teamName: string;
  } | null;
  authoredTasks: Array<{
    id: number;
    title: string;
  }>;
  assignedTasks: Array<{
    id: number;
    title: string;
  }>;
};

type TeamResult = {
  id: number;
  teamName: string;
  user: Array<{
    userId: number;
    username: string;
  }>;
  projectTeams: Array<{
    project: {
      id: number;
      name: string;
    };
  }>;
};

type SearchResults = {
  projects?: ProjectResult[];
  tasks?: TaskResult[];
  users?: UserResult[];
  teams?: TeamResult[];
  total: number;
};

export const search = async (req: Request, res: Response): Promise<void> => {
  try {
    // Validate query parameters
    const validatedQuery = searchQuerySchema.parse(req.query);
    const { q: query, type, limit, offset } = validatedQuery;

    const searchResults: SearchResults = {
      total: 0,
    };

    // Search projects
    if (type === "all" || type === "projects") {
      const projects = await prisma.project.findMany({
        where: {
          OR: [
            { name: { contains: query, mode: "insensitive" } },
            { description: { contains: query, mode: "insensitive" } },
          ],
        },
        take: limit,
        skip: offset,
        include: {
          tasks: {
            select: { id: true, title: true, status: true },
          },
        },
        orderBy: { id: "desc" },
      });

      searchResults.projects = projects;
      searchResults.total += projects.length;
    }

    // Search tasks
    if (type === "all" || type === "tasks") {
      const tasks = await prisma.task.findMany({
        where: {
          OR: [
            { title: { contains: query, mode: "insensitive" } },
            { description: { contains: query, mode: "insensitive" } },
            { tags: { contains: query, mode: "insensitive" } },
          ],
        },
        take: limit,
        skip: offset,
        include: {
          project: {
            select: { id: true, name: true },
          },
          author: {
            select: { userId: true, username: true },
          },
          assignee: {
            select: { userId: true, username: true },
          },
        },
        orderBy: { id: "desc" },
      });

      searchResults.tasks = tasks;
      searchResults.total += tasks.length;
    }

    // Search users
    if (type === "all" || type === "users") {
      const users = await prisma.user.findMany({
        where: {
          OR: [
            { username: { contains: query, mode: "insensitive" } },
            { cognitoId: { contains: query, mode: "insensitive" } },
          ],
        },
        take: limit,
        skip: offset,
        include: {
          team: {
            select: { id: true, teamName: true },
          },
          authoredTasks: {
            select: { id: true, title: true },
            take: 5,
          },
          assignedTasks: {
            select: { id: true, title: true },
            take: 5,
          },
        },
        orderBy: { userId: "desc" },
      });

      searchResults.users = users;
      searchResults.total += users.length;
    }

    // Search teams
    if (type === "all" || type === "teams") {
      const teams = await prisma.team.findMany({
        where: {
          teamName: { contains: query, mode: "insensitive" },
        },
        take: limit,
        skip: offset,
        include: {
          user: {
            select: { userId: true, username: true },
            take: 5,
          },
          projectTeams: {
            include: {
              project: {
                select: { id: true, name: true },
              },
            },
            take: 5,
          },
        },
        orderBy: { id: "desc" },
      });

      searchResults.teams = teams;
      searchResults.total += teams.length;
    }

    // Simulate search delay for demo purposes
    await new Promise((resolve) => setTimeout(resolve, SEARCH_TIMEOUT));

    res.status(HTTP_STATUS.OK).json({
      query,
      type,
      results: searchResults,
      pagination: {
        limit,
        offset,
        total: searchResults.total,
      },
    });
  } catch (error: unknown) {
    // Handle Zod validation errors
    if (error instanceof ZodError) {
      const validationErrors = formatValidationErrors(error);
      res.status(HTTP_STATUS.BAD_REQUEST).json({
        message: "Invalid search parameters",
        errors: validationErrors,
      });
      return;
    }

    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      message: `Error performing search: ${errorMessage}`,
    });
  }
};

export const searchSuggestions = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { q: query } = req.query;

    if (!query || typeof query !== "string" || query.length < 2) {
      res.status(HTTP_STATUS.OK).json({
        suggestions: [],
      });
      return;
    }

    const suggestions: string[] = [];

    // Get project name suggestions
    const projectNames = await prisma.project.findMany({
      where: {
        name: { contains: query, mode: "insensitive" },
      },
      select: { name: true },
      take: 5,
    });
    suggestions.push(...projectNames.map((p) => p.name));

    // Get task title suggestions
    const taskTitles = await prisma.task.findMany({
      where: {
        title: { contains: query, mode: "insensitive" },
      },
      select: { title: true },
      take: 5,
    });
    suggestions.push(...taskTitles.map((t) => t.title));

    // Get username suggestions
    const usernames = await prisma.user.findMany({
      where: {
        username: { contains: query, mode: "insensitive" },
      },
      select: { username: true },
      take: 5,
    });
    suggestions.push(...usernames.map((u) => u.username));

    // Get team name suggestions
    const teamNames = await prisma.team.findMany({
      where: {
        teamName: { contains: query, mode: "insensitive" },
      },
      select: { teamName: true },
      take: 5,
    });
    suggestions.push(...teamNames.map((t) => t.teamName));

    // Remove duplicates and limit results
    const uniqueSuggestions = [...new Set(suggestions)].slice(0, 10);

    res.status(HTTP_STATUS.OK).json({
      suggestions: uniqueSuggestions,
    });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      message: `Error getting search suggestions: ${errorMessage}`,
    });
  }
};
