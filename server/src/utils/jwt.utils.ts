import config from "config";
import jwt from "jsonwebtoken";
import { Types } from "mongoose";

const privateKey = config.get<string>("privateKey");
const publicKey = config.get<string>("publicKey");
const accessTokenTtl = config.get<string>("accessTokenTtl");
const refreshTokenTtl = config.get<string>("refreshTokenTtl");

type JwtVerifyPayload = {
  user: Types.ObjectId;
  session: Types.ObjectId;
} & jwt.JwtPayload;

export function signJwt(
  object: { user: Types.ObjectId; session: Types.ObjectId },
  type: "accessToken" | "refreshToken"
) {
  return jwt.sign(object, privateKey, {
    expiresIn: type === "accessToken" ? accessTokenTtl : refreshTokenTtl,
    algorithm: "RS256",
  });
}

export function verifyJwt(token: string) {
  try {
    const decoded = jwt.verify(token, publicKey) as JwtVerifyPayload;
    return decoded;
  } catch (error: any) {
    return null;
  }
}
