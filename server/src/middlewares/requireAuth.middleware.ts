import { NextFunction, Request, Response } from "express";
import { getSessionWhereLean } from "../services";

async function requireAuth(_: Request, res: Response, next: NextFunction) {
  const decoded = res.locals.decoded;
  if (!decoded) return res.sendStatus(403);
  const session = await getSessionWhereLean({ _id: decoded.session, valid: true });
  if (!session) return res.sendStatus(403);
  return next();
}

export default requireAuth;
