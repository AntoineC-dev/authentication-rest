import { Response } from "express";
import config from "config";

const accessTokenCookieTtl = config.get<number>("accessTokenCookieTtl");
const refreshTokenCookieTtl = config.get<number>("refreshTokenCookieTtl");
const cookiesOptions = config.get<{
  httpOnly: boolean;
  domain: string;
  path: string;
  sameSite: boolean | "lax" | "strict" | "none" | undefined;
  secure: boolean;
}>("cookiesOptions");

type CookieName = "accessToken" | "refreshToken";

export function createCookie(res: Response, name: CookieName, token: string) {
  return res.cookie(name, token, {
    maxAge: name === "accessToken" ? accessTokenCookieTtl : refreshTokenCookieTtl,
    ...cookiesOptions,
  });
}

export function clearCookies(res: Response, name?: CookieName) {
  if (!name) {
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
    return;
  } else {
    return res.clearCookie(name);
  }
}
