import express from "express";
import sessionRouter from "./session.routes";
import userRouter from "./user.routes";
const router = express.Router();

router.get("/api/healthcheck", (_, res) => res.sendStatus(200));
router.use(sessionRouter);
router.use(userRouter);

export default router;
