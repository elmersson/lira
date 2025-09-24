import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  setTimeout(() => {
    res.status(200).send("OK");
  }, 600);
});

export default router;
