import "dotenv/config.js";
import jsonwebtoken from "jsonwebtoken";

export function issueJWT(game) {
  const payload = {
    sub: game.id,
    iat: Date.now(),
  };

  const signedToken = jsonwebtoken.sign(payload, process.env.SECRET_KEY, {
    expiresIn: "20m",
  });

  return {
    token: signedToken,
  };
}
