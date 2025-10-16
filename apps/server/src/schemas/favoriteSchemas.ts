import { z } from "zod";

export const addFavoriteSchema = z.object({
  userId: z.number().int().positive(),
  entityType: z.enum(["project", "task", "team", "user"]),
  entityId: z.number().int().positive(),
});

export const removeFavoriteSchema = z.object({
  userId: z.number().int().positive(),
  entityType: z.enum(["project", "task", "team", "user"]),
  entityId: z.number().int().positive(),
});

export const getUserFavoritesSchema = z.object({
  userId: z.string().transform((val) => Number.parseInt(val, 10)),
});

export const getFavoritesByTypeSchema = z.object({
  userId: z.string().transform((val) => Number.parseInt(val, 10)),
  entityType: z.enum(["project", "task", "team", "user"]),
});

export const checkIsFavoriteSchema = z.object({
  userId: z.string().transform((val) => Number.parseInt(val, 10)),
  entityType: z.enum(["project", "task", "team", "user"]),
  entityId: z.string().transform((val) => Number.parseInt(val, 10)),
});

export type AddFavoriteInput = z.infer<typeof addFavoriteSchema>;
export type RemoveFavoriteInput = z.infer<typeof removeFavoriteSchema>;
export type GetUserFavoritesInput = z.infer<typeof getUserFavoritesSchema>;
export type GetFavoritesByTypeInput = z.infer<typeof getFavoritesByTypeSchema>;
export type CheckIsFavoriteInput = z.infer<typeof checkIsFavoriteSchema>;
