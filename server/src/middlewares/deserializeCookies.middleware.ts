import { NextFunction, Request, Response } from "express";
import { get } from "lodash";
import { createCookie, signJwt, verifyJwt } from "../utils";

async function deserializeCookies(req: Request, res: Response, next: NextFunction) {
  const accessToken = get(req, "cookies.accessToken");
  if (accessToken) {
    const decoded = verifyJwt(accessToken);
    if (decoded) {
      res.locals.decoded = decoded;
      return next();
    }
  }
  const refreshToken = get(req, "cookies.refreshToken");
  if (refreshToken) {
    const decoded = verifyJwt(refreshToken);
    if (decoded) {
      const { session, user } = decoded;
      const newAccessToken = signJwt({ session, user }, "accessToken");
      createCookie(res, "accessToken", newAccessToken);
      res.locals.decoded = decoded;
      return next();
    }
  }
  return next();
}

export default deserializeCookies;
