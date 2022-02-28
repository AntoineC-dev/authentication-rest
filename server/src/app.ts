import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import config from "config";
import router from "./routes";
import { connectToDb, logger, verifySmtp } from "./utils";
import { deserializeCookies } from "./middlewares";

const app = express();

const origin = config.get<string>("origin");
const corsOptions = { origin, credentials: true };

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.use(deserializeCookies);
app.use(router);

const port = config.get<number>("port");

app.listen(port, async () => {
  logger.info(`App running at http://localhost:${port}`);
  await connectToDb();
  verifySmtp();
});
