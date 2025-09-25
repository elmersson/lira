import type { Request, Response } from "express";
import { ZodError } from "zod";
import { formatValidationErrors, HTTP_STATUS } from "@/helpers";
import { PrismaClient } from "../../prisma/generated/client";
import { createProjectSchema } from "../schemas/projectSchemas";

const prisma = new PrismaClient();

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
