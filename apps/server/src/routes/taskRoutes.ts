import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  setTimeout(() => {
    res.status(200).send("OK");
  }, 800);
});

export default router;
