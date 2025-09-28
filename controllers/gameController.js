import asyncHandler from "express-async-handler";
import passport from "../passport-config.js";
import { issueJWT } from "../jwt-config.js";
import { PrismaClient } from "../generated/prisma/client.js";
import { body, validationResult } from "express-validator";
import { getTopGames } from "../generated/prisma/sql/getTopGames.js";
const prisma = new PrismaClient();

export const create_game = asyncHandler(async (req, res, next) => {
  try {
    const game = await prisma.game.create({
      data: {
        startDate: new Date(),
      },
    });
    const tokenObject = issueJWT(game);
    res.status(200).json({
      success: true,
      token: tokenObject.token,
      expiresIn: tokenObject.expires,
    });
  } catch (err) {
    return next(err);
  }
});

export const get_game = [
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.status(200).json(req.user);
  },
];

export const update_game_end = [
  passport.authenticate("jwt", { session: false }),
  body("endDate")
    .exists()
    .not()
    .isEmpty()
    .withMessage("endDate cannot be empty")
    .isISO8601()
    .withMessage("Date is not ISO08601"),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(200).json(errors.array());
    } else {
      try {
        const game = await prisma.game.update({
          where: { id: req.user.id },
          data: {
            endDate: new Date(req.body.endDate),
          },
        });
        res.status(200).json(game);
      } catch (err) {
        return next(err);
      }
    }
  }),
];

export const update_game_player = [
  passport.authenticate("jwt", { session: false }),
  body("name")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Name required"),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(200).json(errors.array());
    } else {
      try {
        const game = await prisma.game.update({
          where: { id: req.user.id },
          data: {
            player: req.body.name,
          },
        });
        res.status(200).json(game);
      } catch (err) {
        return next(err);
      }
    }
  }),
];

export const get_top_games = asyncHandler(async (req, res, next) => {
  try {
    const top_games = await prisma.$queryRawTyped(getTopGames());
    res.status(200).json(top_games);
  } catch (err) {
    return next(err);
  }
});
