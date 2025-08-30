import { Router } from "express";
import { create_game, get_game } from "../controllers/gameController.js";
const router = Router();

router.get("/game", get_game);
router.post("/game", create_game);

export default router;
