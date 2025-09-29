import type { Request, Response } from "express";
import { ZodError } from "zod";
import { formatValidationErrors, HTTP_STATUS } from "@/helpers";
import { PrismaClient } from "../../prisma/generated/client";
import {
  createProjectSchema,
  type UpdateProjectInput,
  updateProjectSchema,
} from "../schemas/projectSchemas";

const prisma = new PrismaClient();

// Helper function to validate and parse project ID
const validateProjectId = (id: string): number => {
  const projectId = Number.parseInt(id, 10);
  if (Number.isNaN(projectId)) {
    throw new Error("Invalid project ID format");
  }
  return projectId;
};

// Helper function to prepare update data
const prepareUpdateData = (validatedData: UpdateProjectInput) => {
  const updateData: {
    name?: string;
    description?: string | null;
    startDate?: Date | null;
    endDate?: Date | null;
  } = {};

  if (validatedData.name !== undefined) {
    updateData.name = validatedData.name;
  }

  if (validatedData.description !== undefined) {
    updateData.description = validatedData.description?.trim() || null;
  }

  if (validatedData.startDate !== undefined) {
    updateData.startDate = validatedData.startDate
      ? new Date(validatedData.startDate)
      : null;
  }

  if (validatedData.endDate !== undefined) {
    updateData.endDate = validatedData.endDate
      ? new Date(validatedData.endDate)
      : null;
  }

  return updateData;
};

export const getProjects = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    const projects = await prisma.project.findMany({
      orderBy: { id: "desc" },
    });
    res.status(HTTP_STATUS.OK).json({
      data: projects,
    });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      message: `Error retrieving projects: ${errorMessage}`,
    });
  }
};

export const createProject = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    // Validate request body using Zod
    const validatedData = createProjectSchema.parse(req.body);

    // Prepare project data with proper date conversion
    const projectData: {
      name: string;
      description?: string;
      startDate?: Date;
      endDate?: Date;
    } = {
      name: validatedData.name,
    };

    // Only add description if it's provided and not empty
    if (validatedData.description?.trim()) {
      projectData.description = validatedData.description;
    }

    // Convert date strings to Date objects if they exist
    if (validatedData.startDate) {
      projectData.startDate = new Date(validatedData.startDate);
    }

    if (validatedData.endDate) {
      projectData.endDate = new Date(validatedData.endDate);
    }

    const newProject = await prisma.project.create({
      data: projectData,
    });

    res.status(HTTP_STATUS.CREATED).json({
      message: "Project created successfully",
      data: newProject,
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
      message: `Error creating project: ${errorMessage}`,
    });
  }
};

export const getProjectById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    if (!id) {
      res.status(HTTP_STATUS.BAD_REQUEST).json({
        message: "Project ID is required",
      });
      return;
    }

    const projectId = validateProjectId(id);

    const project = await prisma.project.findUnique({
      where: { id: projectId },
    });

    if (!project) {
      res.status(HTTP_STATUS.NOT_FOUND).json({
        message: "Project not found",
      });
      return;
    }

    res.status(HTTP_STATUS.OK).json({
      data: project,
    });
  } catch (error: unknown) {
    if (
      error instanceof Error &&
      error.message === "Invalid project ID format"
    ) {
      res.status(HTTP_STATUS.BAD_REQUEST).json({
        message: error.message,
      });
      return;
    }

    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      message: `Error retrieving project: ${errorMessage}`,
    });
  }
};

export const updateProject = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    // Validate that id is provided and is a valid number
    if (!id) {
      res.status(HTTP_STATUS.BAD_REQUEST).json({
        message: "Project ID is required",
      });
      return;
    }

    const projectId = Number.parseInt(id, 10);
    if (Number.isNaN(projectId)) {
      res.status(HTTP_STATUS.BAD_REQUEST).json({
        message: "Invalid project ID format",
      });
      return;
    }

    // Check if project exists
    const existingProject = await prisma.project.findUnique({
      where: { id: projectId },
    });

    if (!existingProject) {
      res.status(HTTP_STATUS.NOT_FOUND).json({
        message: "Project not found",
      });
      return;
    }

    // Validate request body using Zod
    const validatedData = updateProjectSchema.parse(req.body);

    // Prepare project data with proper date conversion
    const updateData: {
      name?: string;
      description?: string | null;
      startDate?: Date | null;
      endDate?: Date | null;
    } = {};

    // Only update fields that are provided
    if (validatedData.name !== undefined) {
      updateData.name = validatedData.name;
    }

    if (validatedData.description !== undefined) {
      updateData.description = validatedData.description?.trim() || null;
    }

    if (validatedData.startDate !== undefined) {
      updateData.startDate = validatedData.startDate
        ? new Date(validatedData.startDate)
        : null;
    }

    if (validatedData.endDate !== undefined) {
      updateData.endDate = validatedData.endDate
        ? new Date(validatedData.endDate)
        : null;
    }

    const updatedProject = await prisma.project.update({
      where: { id: projectId },
      data: updateData,
    });

    res.status(HTTP_STATUS.OK).json({
      message: "Project updated successfully",
      data: updatedProject,
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
      message: `Error updating project: ${errorMessage}`,
    });
  }
};

export const deleteProject = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    if (!id) {
      res.status(HTTP_STATUS.BAD_REQUEST).json({
        message: "Project ID is required",
      });
      return;
    }

    const projectId = validateProjectId(id);

    // Check if project exists
    const existingProject = await prisma.project.findUnique({
      where: { id: projectId },
    });

    if (!existingProject) {
      res.status(HTTP_STATUS.NOT_FOUND).json({
        message: "Project not found",
      });
      return;
    }

    // Delete the project
    await prisma.project.delete({
      where: { id: projectId },
    });

    res.status(HTTP_STATUS.OK).json({
      message: "Project deleted successfully",
      data: { id: projectId },
    });
  } catch (error: unknown) {
    if (
      error instanceof Error &&
      error.message === "Invalid project ID format"
    ) {
      res.status(HTTP_STATUS.BAD_REQUEST).json({
        message: error.message,
      });
      return;
    }

    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      message: `Error deleting project: ${errorMessage}`,
    });
  }
};
