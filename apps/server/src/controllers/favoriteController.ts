import type { Request, Response } from "express";
import prisma from "../db";

// Add a favorite
export const addFavorite = async (req: Request, res: Response) => {
  try {
    const { userId, entityType, entityId } = req.body;

    // Validate entity type
    const validEntityTypes = ["project", "task", "team", "user"];
    if (!validEntityTypes.includes(entityType)) {
      return res.status(400).json({
        error: "Invalid entity type. Must be one of: project, task, team, user",
      });
    }

    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { userId: Number.parseInt(userId, 10) },
    });

    if (!user) {
      return res.status(404).json({
        error: "User not found",
      });
    }

    // Check if favorite already exists
    const existingFavorite = await prisma.favorite.findUnique({
      where: {
        userId_entityType_entityId: {
          userId: Number.parseInt(userId, 10),
          entityType,
          entityId: Number.parseInt(entityId, 10),
        },
      },
    });

    if (existingFavorite) {
      return res.status(409).json({ error: "Item is already favorited" });
    }

    // Create favorite
    const favorite = await prisma.favorite.create({
      data: {
        userId: Number.parseInt(userId, 10),
        entityType,
        entityId: Number.parseInt(entityId, 10),
      },
    });

    res.status(201).json(favorite);
  } catch (error) {
    console.error("Error adding favorite:", error);
    res.status(500).json({ error: "Failed to add favorite" });
  }
};

// Remove a favorite
export const removeFavorite = async (req: Request, res: Response) => {
  try {
    const { userId, entityType, entityId } = req.body;

    const favorite = await prisma.favorite.findUnique({
      where: {
        userId_entityType_entityId: {
          userId: Number.parseInt(userId, 10),
          entityType,
          entityId: Number.parseInt(entityId, 10),
        },
      },
    });

    if (!favorite) {
      return res.status(404).json({ error: "Favorite not found" });
    }

    await prisma.favorite.delete({
      where: {
        id: favorite.id,
      },
    });

    res.status(200).json({ message: "Favorite removed successfully" });
  } catch (error) {
    console.error("Error removing favorite:", error);
    res.status(500).json({ error: "Failed to remove favorite" });
  }
};

// Get all favorites for a user
export const getUserFavorites = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const favorites = await prisma.favorite.findMany({
      where: {
        userId: Number.parseInt(userId, 10),
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    // Group favorites by entity type
    const groupedFavorites = favorites.reduce(
      (acc, favorite) => {
        if (!acc[favorite.entityType]) {
          acc[favorite.entityType] = [];
        }
        acc[favorite.entityType].push(favorite);
        return acc;
      },
      {} as Record<string, typeof favorites>
    );

    res.status(200).json(groupedFavorites);
  } catch (error) {
    console.error("Error fetching user favorites:", error);
    res.status(500).json({ error: "Failed to fetch favorites" });
  }
};

// Get favorites by type for a user
export const getFavoritesByType = async (req: Request, res: Response) => {
  try {
    const { userId, entityType } = req.params;

    const favorites = await prisma.favorite.findMany({
      where: {
        userId: Number.parseInt(userId, 10),
        entityType,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    // Get the actual entities based on type
    let entities = [];

    if (entityType === "project" && favorites.length > 0) {
      const projectIds = favorites.map((f) => f.entityId);
      entities = await prisma.project.findMany({
        where: { id: { in: projectIds } },
        include: {
          tasks: { take: 5 },
          projectTeams: { include: { team: true } },
        },
      });
    } else if (entityType === "task" && favorites.length > 0) {
      const taskIds = favorites.map((f) => f.entityId);
      entities = await prisma.task.findMany({
        where: { id: { in: taskIds } },
        include: {
          project: true,
          author: true,
          assignee: true,
        },
      });
    } else if (entityType === "team" && favorites.length > 0) {
      const teamIds = favorites.map((f) => f.entityId);
      entities = await prisma.team.findMany({
        where: { id: { in: teamIds } },
        include: {
          user: true,
          projectTeams: { include: { project: true } },
        },
      });
    } else if (entityType === "user" && favorites.length > 0) {
      const userIds = favorites.map((f) => f.entityId);
      entities = await prisma.user.findMany({
        where: { userId: { in: userIds } },
        include: {
          team: true,
        },
      });
    }

    // Combine favorites with entity data
    const favoritesWithEntities = favorites.map((favorite) => ({
      ...favorite,
      entity: entities.find((entity) => {
        const entityId = entityType === "user" ? entity.userId : entity.id;
        return entityId === favorite.entityId;
      }),
    }));

    res.status(200).json(favoritesWithEntities);
  } catch (error) {
    console.error("Error fetching favorites by type:", error);
    res.status(500).json({ error: "Failed to fetch favorites" });
  }
};

// Check if an item is favorited
export const checkIsFavorite = async (req: Request, res: Response) => {
  try {
    const { userId, entityType, entityId } = req.params;

    const favorite = await prisma.favorite.findUnique({
      where: {
        userId_entityType_entityId: {
          userId: Number.parseInt(userId, 10),
          entityType,
          entityId: Number.parseInt(entityId, 10),
        },
      },
    });

    res.status(200).json({ isFavorite: !!favorite });
  } catch (error) {
    console.error("Error checking favorite status:", error);
    res.status(500).json({ error: "Failed to check favorite status" });
  }
};
