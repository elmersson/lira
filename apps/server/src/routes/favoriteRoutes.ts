import { Router } from "express";
import {
  addFavorite,
  checkIsFavorite,
  getFavoritesByType,
  getUserFavorites,
  removeFavorite,
} from "../controllers/favoriteController";

const router = Router();

// Add a favorite
router.post("/", addFavorite);

// Remove a favorite
router.delete("/", removeFavorite);

// Get all favorites for a user
router.get("/user/:userId", getUserFavorites);

// Get favorites by type for a user
router.get("/user/:userId/:entityType", getFavoritesByType);

// Check if an item is favorited
router.get("/check/:userId/:entityType/:entityId", checkIsFavorite);

export default router;
