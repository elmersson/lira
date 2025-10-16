import { Router } from "express";
import { createTestUser } from "../helpers/createTestUser";

const router = Router();

// Get or create a test user
router.get("/test-user", async (req, res) => {
  try {
    const user = await createTestUser();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Failed to create/get test user" });
  }
});

export default router;
