import { Router } from "express";
import { search, searchSuggestions } from "@/controllers/searchController";

const router = Router();

router.get("/", search);
router.get("/suggestions", searchSuggestions);

export default router;
