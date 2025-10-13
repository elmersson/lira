import type { Request, Response } from "express";
import { ZodError } from "zod";
import { PrismaClient } from "../../prisma/generated/client";
import { formatValidationErrors, HTTP_STATUS } from "../helpers";
import {
  createUserSchema,
  getUsersQuerySchema,
  type UpdateUserInput,
  updateUserSchema,
} from "../schemas/userSchemas";

const prisma = new PrismaClient();

// Helper function to handle unique constraint errors
const handleUniqueConstraintError = (error: Error, res: Response): boolean => {
  if (error.message.includes("Unique constraint")) {
    if (error.message.includes("cognitoId")) {
      res.status(HTTP_STATUS.BAD_REQUEST).json({
        message: "A user with this Cognito ID already exists",
      });
      return true;
    }
    if (error.message.includes("username")) {
      res.status(HTTP_STATUS.BAD_REQUEST).json({
        message: "A user with this username already exists",
      });
      return true;
    }
  }
  return false;
};

// Helper function to build user data
const buildUserData = (validatedData: any) => {
  const userData: {
    cognitoId: string;
    username: string;
    emoji?: string;
    profilePictureUrl?: string;
    teamId?: number;
  } = {
    cognitoId: validatedData.cognitoId,
    username: validatedData.username,
  };

  if (validatedData.emoji?.trim()) {
    userData.emoji = validatedData.emoji;
  }
  if (validatedData.profilePictureUrl?.trim()) {
    userData.profilePictureUrl = validatedData.profilePictureUrl;
  }
  if (validatedData.teamId) {
    userData.teamId = validatedData.teamId;
  }

  return userData;
};

export const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    // Validate query parameters
    const validatedQuery = getUsersQuerySchema.parse(req.query);

    // Build where clause based on validated query
    const where: {
      teamId?: number;
      username?: string | { contains: string; mode: "insensitive" };
    } = {};
    if (validatedQuery.teamId) {
      where.teamId = validatedQuery.teamId;
    }
    if (validatedQuery.username) {
      where.username = {
        contains: validatedQuery.username,
        mode: "insensitive",
      };
    }

    const users = await prisma.user.findMany({
      where,
      orderBy: { userId: "desc" },
      include: {
        team: {
          select: { id: true, teamName: true },
        },
        authoredTasks: {
          select: { id: true, title: true, status: true },
        },
        assignedTasks: {
          select: { id: true, title: true, status: true },
        },
      },
    });

    // Get total count for pagination
    const total = await prisma.user.count({ where });

    res.status(HTTP_STATUS.OK).json({
      users,
      total,
      page: 1, // Default page since we're not implementing pagination yet
      limit: users.length,
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
      message: `Error retrieving users: ${errorMessage}`,
    });
  }
};

export const createUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    // Validate request body using Zod
    const validatedData = createUserSchema.parse(req.body);
    const userData = buildUserData(validatedData);

    const newUser = await prisma.user.create({
      data: userData,
      include: {
        team: {
          select: { id: true, teamName: true },
        },
      },
    });

    res.status(HTTP_STATUS.CREATED).json({
      message: "User created successfully",
      data: newUser,
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

    // Handle Prisma unique constraint errors
    if (error instanceof Error && handleUniqueConstraintError(error, res)) {
      return;
    }

    // Handle other errors
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      message: `Error creating user: ${errorMessage}`,
    });
  }
};

const buildUpdateData = (validatedData: UpdateUserInput) => {
  const updateData: {
    cognitoId?: string;
    username?: string;
    profilePictureUrl?: string | null;
    teamId?: number | null;
  } = {};

  if (validatedData.cognitoId) {
    updateData.cognitoId = validatedData.cognitoId;
  }
  if (validatedData.username) {
    updateData.username = validatedData.username;
  }
  if (validatedData.profilePictureUrl !== undefined) {
    updateData.profilePictureUrl =
      validatedData.profilePictureUrl?.trim() || null;
  }
  if (validatedData.teamId !== undefined) {
    updateData.teamId = validatedData.teamId;
  }

  return updateData;
};

export const updateUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const userId = Number.parseInt(id, 10);

    if (Number.isNaN(userId)) {
      res.status(HTTP_STATUS.BAD_REQUEST).json({
        message: "Invalid user ID",
      });
      return;
    }

    const validatedData = updateUserSchema.parse(req.body);
    const updateData = buildUpdateData(validatedData);

    const updatedUser = await prisma.user.update({
      where: { userId },
      data: updateData,
      include: {
        team: {
          select: { id: true, teamName: true },
        },
        authoredTasks: {
          select: { id: true, title: true, status: true },
        },
        assignedTasks: {
          select: { id: true, title: true, status: true },
        },
      },
    });

    res.status(HTTP_STATUS.OK).json(updatedUser);
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

    // Handle Prisma unique constraint errors
    if (error instanceof Error && handleUniqueConstraintError(error, res)) {
      return;
    }

    // Handle Prisma errors
    if (
      error instanceof Error &&
      error.message.includes("Record to update not found")
    ) {
      res.status(HTTP_STATUS.NOT_FOUND).json({
        message: "User not found",
      });
      return;
    }

    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      message: `Error updating user: ${errorMessage}`,
    });
  }
};

export const deleteUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const userId = Number.parseInt(id, 10);

    if (Number.isNaN(userId)) {
      res.status(HTTP_STATUS.BAD_REQUEST).json({
        message: "Invalid user ID",
      });
      return;
    }

    await prisma.user.delete({
      where: { userId },
    });

    res.status(HTTP_STATUS.OK).json({
      message: "User deleted successfully",
    });
  } catch (error: unknown) {
    // Handle Prisma errors
    if (
      error instanceof Error &&
      error.message.includes("Record to delete does not exist")
    ) {
      res.status(HTTP_STATUS.NOT_FOUND).json({
        message: "User not found",
      });
      return;
    }

    // Handle foreign key constraint errors
    if (
      error instanceof Error &&
      error.message.includes("Foreign key constraint")
    ) {
      res.status(HTTP_STATUS.BAD_REQUEST).json({
        message:
          "Cannot delete user. User is referenced by tasks or other entities.",
      });
      return;
    }

    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      message: `Error deleting user: ${errorMessage}`,
    });
  }
};

export const getUserById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const userId = Number.parseInt(id, 10);

    if (Number.isNaN(userId)) {
      res.status(HTTP_STATUS.BAD_REQUEST).json({
        message: "Invalid user ID",
      });
      return;
    }

    const user = await prisma.user.findUnique({
      where: { userId },
      include: {
        team: {
          select: { id: true, teamName: true },
        },
        authoredTasks: {
          select: { id: true, title: true },
        },
        assignedTasks: {
          select: { id: true, title: true },
        },
      },
    });

    if (!user) {
      res.status(HTTP_STATUS.NOT_FOUND).json({
        message: "User not found",
      });
      return;
    }

    res.status(HTTP_STATUS.OK).json(user);
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      message: `Error retrieving user: ${errorMessage}`,
    });
  }
};
