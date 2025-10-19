import asyncHandler from "express-async-handler";
import passport from "../passport-config.js";
import { PrismaClient } from "../generated/prisma/client.js";
import { body, validationResult } from "express-validator";
const prisma = new PrismaClient();

export const create_subject = asyncHandler(async (req, res, next) => {
  try {
    const subject = await prisma.subject.create({
      data: {
        num: +req.body.num,
        x: +req.body.x,
        y: +req.body.y,
      },
    });
    res.status(200).json(subject);
  } catch (err) {
    return next(err);
  }
});

export const update_subject = [
  passport.authenticate("jwt", { session: false }),
  body("subject").isInt({ min: 1, max: 3 }).withMessage("Invalid subject ID"),
  body("minY").isNumeric().withMessage("Min Y is not a numeric value"),
  body("minX").isNumeric().withMessage("Min X is not a numeric value"),
  body("maxY").isNumeric().withMessage("Max Y is not a numeric value"),
  body("maxX").isNumeric().withMessage("Max X is not a numeric value"),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(200).json(errors.array());
    } else {
      try {
        if (+req.body.subject === 1) {
          const subject = await prisma.subject.findFirst({
            where: {
              AND: [
                { num: 1 },
                { y: { gt: Number(req.body.minY) } },
                { y: { lt: Number(req.body.maxY) } },
                { x: { gt: Number(req.body.minX) } },
                { x: { lt: Number(req.body.maxX) } },
              ],
            },
          });

          if (!subject) {
            res.status(200).json({ message: "Waldo is not in the square" });
          } else {
            const subjectUpdated = await prisma.subject.update({
              where: {
                id: subject.id,
              },
              data: {
                one: { connect: { id: req.user.id } },
              },
            });
            res.status(200).json(subjectUpdated);
          }
        } else if (+req.body.subject === 2) {
          const subject = await prisma.subject.findFirst({
            where: {
              AND: [
                { num: 2 },
                { y: { gt: Number(req.body.minY) } },
                { y: { lt: Number(req.body.maxY) } },
                { x: { gt: Number(req.body.minX) } },
                { x: { lt: Number(req.body.maxX) } },
              ],
            },
          });
          if (!subject) {
            res.status(200).json({ message: "Waldo is not in the square" });
          } else {
            const subjectUpdated = await prisma.subject.update({
              where: {
                id: subject.id,
              },
              data: {
                two: { connect: { id: req.user.id } },
              },
            });
            res.status(200).json(subjectUpdated);
          }
        } else if (+req.body.subject === 3) {
          const subject = await prisma.subject.findFirst({
            where: {
              AND: [
                { num: 3 },
                { y: { gt: Number(req.body.minY) } },
                { y: { lt: Number(req.body.maxY) } },
                { x: { gt: Number(req.body.minX) } },
                { x: { lt: Number(req.body.maxX) } },
              ],
            },
          });
          if (!subject) {
            res.status(200).json({ message: "Waldo is not in the square" });
          } else {
            const subjectUpdated = await prisma.subject.update({
              where: {
                id: subject.id,
              },
              data: {
                three: { connect: { id: req.user.id } },
              },
            });
            res.status(200).json(subjectUpdated);
          }
        } else {
          res.status(200).json({ message: "Waldo is not in the square" });
        }
      } catch (err) {
        return next(err);
      }
    }
  }),
];
