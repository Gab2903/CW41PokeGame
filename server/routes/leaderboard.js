import { Router } from "express";
const router = Router();
import {
  getAllScores,
  createScore,
} from "../controllers/leaderboardController.js";

router.get("/", getAllScores);

router.post("/", createScore);

export default router;
