import { Request, Response } from "express";
import { CreateSessionInput } from "../schemas";
import { createSession, getUserWhere, invalidateAllSessions, invalidateSession } from "../services";
import { clearCookies, createCookie, logger, signJwt } from "../utils";

export async function createSessionhandler(req: Request<{}, {}, CreateSessionInput>, res: Response) {
  const message = "Invalid email or password";
  const { email, password } = req.body;
  try {
    const user = await getUserWhere({ email });
    if (!user) return res.status(400).send(message);
    if (!user.verified) return res.status(400).send("Please verify your account");
    const isValid = await user.validatePassword(password);
    if (!isValid) return res.status(400).send(message);
    const session = await createSession(user._id, req.get("user-agent") ?? "");
    // Access Token
    const accessToken = signJwt({ user: user._id, session: session._id }, "accessToken");
    createCookie(res, "accessToken", accessToken);
    // Refresh Token
    const refreshToken = signJwt({ user: user._id, session: session._id }, "refreshToken");
    createCookie(res, "refreshToken", refreshToken);
    return res.status(201).send({ message: "User successfully logged in" });
  } catch (error) {
    logger.error(error, "Could not create session");
    return res.status(500).send(error);
  }
}

export async function invalidateSessionHandler(_: Request, res: Response) {
  const { session } = res.locals.decoded;
  try {
    await invalidateSession(session);
    clearCookies(res);
    return res.send({ message: "User successfully logged out" });
  } catch (error) {
    logger.error(error, "Could not invalidate session");
    return res.status(500).send(error);
  }
}

export async function invalidateAllSessionsHandler(req: Request, res: Response) {
  const { user } = res.locals.decoded;
  try {
    await invalidateAllSessions(user);
    clearCookies(res);
    return res.send({ message: "User logged out from all devices" });
  } catch (error) {
    logger.error(error, "Could not invalidate all sessions");
    return res.status(500).send(error);
  }
}
