import { Router } from "express";
import {
  createTeam,
  deleteTeam,
  getTeams,
  updateTeam,
} from "@/controllers/teamController";

const router = Router();

router.get("/", getTeams);
router.post("/", createTeam);
router.put("/:id", updateTeam);
router.delete("/:id", deleteTeam);

export default router;
