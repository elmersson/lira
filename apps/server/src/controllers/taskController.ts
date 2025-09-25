import type { Request, Response } from "express";
import { ZodError } from "zod";
import { formatValidationErrors, HTTP_STATUS } from "@/helpers";
import { PrismaClient } from "../../prisma/generated/client";
import {
  createTaskSchema,
  getTasksQuerySchema,
  type UpdateTaskInput,
  updateTaskSchema,
} from "../schemas/taskSchemas";

const prisma = new PrismaClient();

export const getTasks = async (req: Request, res: Response): Promise<void> => {
  try {
    // Validate query parameters
    const validatedQuery = getTasksQuerySchema.parse(req.query);

    // Build where clause based on validated query
    const where: {
      projectId?: number;
      status?: string;
      priority?: string;
      assignedUserId?: number;
    } = {};
    if (validatedQuery.projectId) {
      where.projectId = validatedQuery.projectId;
    }
    if (validatedQuery.status) {
      where.status = validatedQuery.status;
    }
    if (validatedQuery.priority) {
      where.priority = validatedQuery.priority;
    }
    if (validatedQuery.assignedUserId) {
      where.assignedUserId = validatedQuery.assignedUserId;
    }

    const tasks = await prisma.task.findMany({
      where,
      orderBy: { id: "desc" },
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
    });

    res.status(HTTP_STATUS.OK).json({
      data: tasks,
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
      message: `Error retrieving tasks: ${errorMessage}`,
    });
  }
};

export const createTask = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    // Validate request body using Zod
    const validatedData = createTaskSchema.parse(req.body);

    // Prepare task data with proper date conversion
    const taskData: {
      title: string;
      description?: string;
      status?: string;
      priority?: string;
      tags?: string;
      startDate?: Date;
      dueDate?: Date;
      points?: number;
      projectId: number;
      authorUserId: number;
      assignedUserId?: number;
    } = {
      title: validatedData.title,
      projectId: validatedData.projectId,
      authorUserId: validatedData.authorUserId,
    };

    // Add optional fields if provided
    if (validatedData.description?.trim()) {
      taskData.description = validatedData.description;
    }
    if (validatedData.status) {
      taskData.status = validatedData.status;
    }
    if (validatedData.priority) {
      taskData.priority = validatedData.priority;
    }
    if (validatedData.tags?.trim()) {
      taskData.tags = validatedData.tags;
    }
    if (validatedData.points) {
      taskData.points = validatedData.points;
    }
    if (validatedData.assignedUserId) {
      taskData.assignedUserId = validatedData.assignedUserId;
    }

    // Convert date strings to Date objects if they exist
    if (validatedData.startDate) {
      taskData.startDate = new Date(validatedData.startDate);
    }
    if (validatedData.dueDate) {
      taskData.dueDate = new Date(validatedData.dueDate);
    }

    const newTask = await prisma.task.create({
      data: taskData,
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
    });

    res.status(HTTP_STATUS.CREATED).json({
      message: "Task created successfully",
      data: newTask,
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

    // Handle other errors
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      message: `Error creating task: ${errorMessage}`,
    });
  }
};

const buildUpdateData = (validatedData: UpdateTaskInput) => {
  const updateData: {
    title?: string;
    description?: string | null;
    status?: string;
    priority?: string;
    tags?: string | null;
    points?: number;
    assignedUserId?: number;
    startDate?: Date;
    dueDate?: Date;
  } = {};

  if (validatedData.title) {
    updateData.title = validatedData.title;
  }
  if (validatedData.description !== undefined) {
    updateData.description = validatedData.description?.trim() || null;
  }
  if (validatedData.status) {
    updateData.status = validatedData.status;
  }
  if (validatedData.priority) {
    updateData.priority = validatedData.priority;
  }
  if (validatedData.tags !== undefined) {
    updateData.tags = validatedData.tags?.trim() || null;
  }
  if (validatedData.points) {
    updateData.points = validatedData.points;
  }
  if (validatedData.assignedUserId !== undefined) {
    updateData.assignedUserId = validatedData.assignedUserId;
  }
  if (validatedData.startDate) {
    updateData.startDate = new Date(validatedData.startDate);
  }
  if (validatedData.dueDate) {
    updateData.dueDate = new Date(validatedData.dueDate);
  }

  return updateData;
};

export const updateTask = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const taskId = Number.parseInt(id, 10);

    if (Number.isNaN(taskId)) {
      res.status(HTTP_STATUS.BAD_REQUEST).json({
        message: "Invalid task ID",
      });
      return;
    }

    const validatedData = updateTaskSchema.parse(req.body);
    const updateData = buildUpdateData(validatedData);

    const updatedTask = await prisma.task.update({
      where: { id: taskId },
      data: updateData,
      include: {
        project: { select: { id: true, name: true } },
        author: { select: { userId: true, username: true } },
        assignee: { select: { userId: true, username: true } },
      },
    });

    res.status(HTTP_STATUS.OK).json({
      message: "Task updated successfully",
      data: updatedTask,
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

    // Handle Prisma errors
    if (
      error instanceof Error &&
      error.message.includes("Record to update not found")
    ) {
      res.status(HTTP_STATUS.NOT_FOUND).json({
        message: "Task not found",
      });
      return;
    }

    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      message: `Error updating task: ${errorMessage}`,
    });
  }
};

export const deleteTask = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const taskId = Number.parseInt(id, 10);

    if (Number.isNaN(taskId)) {
      res.status(HTTP_STATUS.BAD_REQUEST).json({
        message: "Invalid task ID",
      });
      return;
    }

    await prisma.task.delete({
      where: { id: taskId },
    });

    res.status(HTTP_STATUS.OK).json({
      message: "Task deleted successfully",
    });
  } catch (error: unknown) {
    // Handle Prisma errors
    if (
      error instanceof Error &&
      error.message.includes("Record to delete does not exist")
    ) {
      res.status(HTTP_STATUS.NOT_FOUND).json({
        message: "Task not found",
      });
      return;
    }

    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      message: `Error deleting task: ${errorMessage}`,
    });
  }
};
