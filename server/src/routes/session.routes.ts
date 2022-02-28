import express from "express";
import { createSessionhandler, invalidateAllSessionsHandler, invalidateSessionHandler } from "../controllers";
import { requireAuth, validateRequestData } from "../middlewares";
import { createSessionSchema } from "../schemas";

const router = express.Router();

router.post("/api/sessions", validateRequestData(createSessionSchema), createSessionhandler);
router.delete("/api/sessions", requireAuth, invalidateSessionHandler);
router.delete("/api/sessions/clear", requireAuth, invalidateAllSessionsHandler);

export default router;
