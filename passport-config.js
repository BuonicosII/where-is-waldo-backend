import "dotenv/config.js";
import passport from "passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import { PrismaClient } from "./generated/prisma/client.js";

const prisma = new PrismaClient();

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET_KEY,
};

passport.use(
  new Strategy(options, async (jwt_payload, done) => {
    try {
      const game = await prisma.game.findUnique({
        where: {
          id: jwt_payload.sub,
        },
        include: {
          subjectOne: true,
          subjectTwo: true,
          subjectThree: true,
        },
      });
      if (!game) {
        return done(null, false);
      }
      return done(null, game);
    } catch (err) {
      return done(err);
    }
  })
);

export default passport;
