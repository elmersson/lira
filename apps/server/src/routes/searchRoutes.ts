import { Router } from "express";
import {
  getSearchHealth,
  search,
  searchSuggestions,
} from "@/controllers/searchController";

const router = Router();

router.get("/", search);
router.get("/suggestions", searchSuggestions);
router.get("/health", getSearchHealth);

export default router;
