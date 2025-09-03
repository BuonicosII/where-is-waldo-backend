import { Router } from "express";
import {
  create_game,
  get_game,
  update_game_end,
} from "../controllers/gameController.js";
const router = Router();

router.get("/game", get_game);
router.post("/game", create_game);
router.put("/game/enddate", update_game_end);

export default router;
