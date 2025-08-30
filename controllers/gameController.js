import asyncHandler from "express-async-handler";
import passport from "../passport-config.js";
import { issueJWT } from "../jwt-config.js";
import { PrismaClient } from "../generated/prisma/client.js";
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
