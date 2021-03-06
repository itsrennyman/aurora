import JWT from "jsonwebtoken";
import * as AuroraDB from "../database";
import { AuroraError } from "../errors";

const JWT_SECRET = process.env.JWT_SECRET;

const verifyJwt = (accessToken) => {
  try {
    return JWT.verify(accessToken, JWT_SECRET);
  } catch (err) {
    throw new AuroraError(401, "Unauthenticated");
  }
};

export const authentication = async (req, res) => {
  const { authorization } = req.headers;

  if (!authorization) {
    throw new AuroraError(401, "Unauthenticated");
  }

  const [type, accessToken] = authorization.split(" ");

  if (type !== "Bearer") {
    throw new AuroraError(401, "Unauthenticated");
  }

  const tokenPayload = verifyJwt(accessToken);

  const user = await AuroraDB.getUser(tokenPayload.data.id);

  if (!user) {
    throw new AuroraError(401, "Unauthenticated");
  }

  const { password, ...userData } = user;

  req.user = userData;
};
