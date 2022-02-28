import dotenv from "dotenv";
dotenv.config();

export default {
  port: process.env.PORT,
  dbUri: process.env.DB_URI,
  accessTokenTtl: "15m",
  refreshTokenTtl: "1y",
  publicKey: process.env.PUBLIC_KEY,
  privateKey: process.env.PRIVATE_KEY,
  smtp: {
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    from: process.env.SMTP_USER,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  },
  accessTokenCookieTtl: 900000, // 15 mn
  refreshTokenCookieTtl: 3.154e10, // 1 year
  cookiesOptions: {
    httpOnly: true,
    domain: process.env.COOKIES_DOMAIN,
    path: process.env.COOKIES_PATH,
    sameSite: "strict",
    secure: false,
  },
  origin: process.env.CORS_ORIGIN,
};
