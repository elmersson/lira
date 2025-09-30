import type { Request, Response } from "express";
import { ZodError } from "zod";
import { formatValidationErrors, HTTP_STATUS } from "@/helpers";
import { PrismaClient } from "../../prisma/generated/client";
import {
  createTeamSchema,
  getTeamsQuerySchema,
  type UpdateTeamInput,
  updateTeamSchema,
} from "../schemas/teamSchemas";

const prisma = new PrismaClient();

export const getTeams = async (req: Request, res: Response): Promise<void> => {
  try {
    // Validate query parameters
    const validatedQuery = getTeamsQuerySchema.parse(req.query);

    // Build where clause based on validated query
    const where: {
      teamName?: string | { contains: string; mode: "insensitive" };
      productOwnerUserId?: number;
      projectManagerUserId?: number;
    } = {};
    if (validatedQuery.teamName) {
      where.teamName = {
        contains: validatedQuery.teamName,
        mode: "insensitive",
      };
    }
    if (validatedQuery.productOwnerUserId) {
      where.productOwnerUserId = validatedQuery.productOwnerUserId;
    }
    if (validatedQuery.projectManagerUserId) {
      where.projectManagerUserId = validatedQuery.projectManagerUserId;
    }

    const teams = await prisma.team.findMany({
      where,
      orderBy: { id: "desc" },
      include: {
        user: {
          select: { userId: true, username: true, cognitoId: true },
        },
        projectTeams: {
          include: {
            project: {
              select: { id: true, name: true },
            },
          },
        },
      },
    });

    res.status(HTTP_STATUS.OK).json({
      data: teams,
    });
  } catch (error: unknown) {
    // Handle Zod validation errors
    if (error instanceof ZodError) {
      const validationErrors = formatValidationErrors(error);
      res.status(HTTP_STATUS.BAD_REQUEST).json({
        message: "Invalid query parameters",
        errors: validationErrors,
      });
      return;
    }

    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      message: `Error retrieving teams: ${errorMessage}`,
    });
  }
};

export const getTeamById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const teamId = Number.parseInt(id, 10);

    if (Number.isNaN(teamId)) {
      res.status(HTTP_STATUS.BAD_REQUEST).json({
        message: "Invalid team ID",
      });
      return;
    }

    const team = await prisma.team.findUnique({
      where: { id: teamId },
      include: {
        user: {
          select: { userId: true, username: true, cognitoId: true },
        },
        projectTeams: {
          include: {
            project: {
              select: { id: true, name: true },
            },
          },
        },
      },
    });

    if (!team) {
      res.status(HTTP_STATUS.NOT_FOUND).json({
        message: "Team not found",
      });
      return;
    }

    res.status(HTTP_STATUS.OK).json({
      data: team,
    });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      message: `Error retrieving team: ${errorMessage}`,
    });
  }
};

export const createTeam = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    // Validate request body using Zod
    const validatedData = createTeamSchema.parse(req.body);

    // Prepare team data
    const teamData: {
      teamName: string;
      productOwnerUserId?: number;
      projectManagerUserId?: number;
    } = {
      teamName: validatedData.teamName,
    };

    // Add optional fields if provided
    if (validatedData.productOwnerUserId) {
      teamData.productOwnerUserId = validatedData.productOwnerUserId;
    }
    if (validatedData.projectManagerUserId) {
      teamData.projectManagerUserId = validatedData.projectManagerUserId;
    }

    const newTeam = await prisma.team.create({
      data: teamData,
      include: {
        user: {
          select: { userId: true, username: true, cognitoId: true },
        },
      },
    });

    res.status(HTTP_STATUS.CREATED).json({
      message: "Team created successfully",
      data: newTeam,
    });
  } catch (error: unknown) {
    // Handle Zod validation errors
    if (error instanceof ZodError) {
      const validationErrors = formatValidationErrors(error);
      res.status(HTTP_STATUS.BAD_REQUEST).json({
        message: "Validation failed",
        errors: validationErrors,
      });
      return;
    }

    // Handle Prisma foreign key constraint errors
    if (
      error instanceof Error &&
      error.message.includes("Foreign key constraint")
    ) {
      if (error.message.includes("productOwnerUserId")) {
        res.status(HTTP_STATUS.BAD_REQUEST).json({
          message: "Product owner user ID does not exist",
        });
        return;
      }
      if (error.message.includes("projectManagerUserId")) {
        res.status(HTTP_STATUS.BAD_REQUEST).json({
          message: "Project manager user ID does not exist",
        });
        return;
      }
    }

    // Handle other errors
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      message: `Error creating team: ${errorMessage}`,
    });
  }
};

const buildUpdateData = (validatedData: UpdateTeamInput) => {
  const updateData: {
    teamName?: string;
    productOwnerUserId?: number | null;
    projectManagerUserId?: number | null;
  } = {};

  if (validatedData.teamName) {
    updateData.teamName = validatedData.teamName;
  }
  if (validatedData.productOwnerUserId !== undefined) {
    updateData.productOwnerUserId = validatedData.productOwnerUserId;
  }
  if (validatedData.projectManagerUserId !== undefined) {
    updateData.projectManagerUserId = validatedData.projectManagerUserId;
  }

  return updateData;
};

export const updateTeam = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const teamId = Number.parseInt(id, 10);

    if (Number.isNaN(teamId)) {
      res.status(HTTP_STATUS.BAD_REQUEST).json({
        message: "Invalid team ID",
      });
      return;
    }

    const validatedData = updateTeamSchema.parse(req.body);
    const updateData = buildUpdateData(validatedData);

    const updatedTeam = await prisma.team.update({
      where: { id: teamId },
      data: updateData,
      include: {
        user: {
          select: { userId: true, username: true, cognitoId: true },
        },
        projectTeams: {
          include: {
            project: {
              select: { id: true, name: true },
            },
          },
        },
      },
    });

    res.status(HTTP_STATUS.OK).json({
      message: "Team updated successfully",
      data: updatedTeam,
    });
  } catch (error: unknown) {
    // Handle Zod validation errors
    if (error instanceof ZodError) {
      const validationErrors = formatValidationErrors(error);
      res.status(HTTP_STATUS.BAD_REQUEST).json({
        message: "Validation failed",
        errors: validationErrors,
      });
      return;
    }

    // Handle Prisma foreign key constraint errors
    if (
      error instanceof Error &&
      error.message.includes("Foreign key constraint")
    ) {
      if (error.message.includes("productOwnerUserId")) {
        res.status(HTTP_STATUS.BAD_REQUEST).json({
          message: "Product owner user ID does not exist",
        });
        return;
      }
      if (error.message.includes("projectManagerUserId")) {
        res.status(HTTP_STATUS.BAD_REQUEST).json({
          message: "Project manager user ID does not exist",
        });
        return;
      }
    }

    // Handle Prisma errors
    if (
      error instanceof Error &&
      error.message.includes("Record to update not found")
    ) {
      res.status(HTTP_STATUS.NOT_FOUND).json({
        message: "Team not found",
      });
      return;
    }

    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      message: `Error updating team: ${errorMessage}`,
    });
  }
};

export const deleteTeam = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const teamId = Number.parseInt(id, 10);

    if (Number.isNaN(teamId)) {
      res.status(HTTP_STATUS.BAD_REQUEST).json({
        message: "Invalid team ID",
      });
      return;
    }

    await prisma.team.delete({
      where: { id: teamId },
    });

    res.status(HTTP_STATUS.OK).json({
      message: "Team deleted successfully",
    });
  } catch (error: unknown) {
    // Handle Prisma errors
    if (
      error instanceof Error &&
      error.message.includes("Record to delete does not exist")
    ) {
      res.status(HTTP_STATUS.NOT_FOUND).json({
        message: "Team not found",
      });
      return;
    }

    // Handle foreign key constraint errors
    if (
      error instanceof Error &&
      error.message.includes("Foreign key constraint")
    ) {
      res.status(HTTP_STATUS.BAD_REQUEST).json({
        message: "Cannot delete team. Team is referenced by users or projects.",
      });
      return;
    }

    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      message: `Error deleting team: ${errorMessage}`,
    });
  }
};
