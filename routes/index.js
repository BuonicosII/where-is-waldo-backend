import { Router } from "express";
import {
  create_game,
  get_game,
  update_game_end,
  update_game_player,
} from "../controllers/gameController.js";
const router = Router();

router.get("/game", get_game);
router.post("/game", create_game);
router.put("/game/enddate", update_game_end);
router.put("/game/player", update_game_player);

export default router;
