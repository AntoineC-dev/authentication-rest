import express from "express";
import {
  createUserHandler,
  getUserHandler,
  passwordResetHandler,
  sendPasswordResetEmailHandler,
  sendVerificationEmailHandler,
  updateUserHandler,
  verifyUserHandler,
} from "../controllers";
import { requireAuth, validateRequestData } from "../middlewares";
import {
  createUserSchema,
  passwordResetSchema,
  sendPasswordResetEmailSchema,
  sendVerificationEmailSchema,
  updateUserSchema,
  verifyUserSchema,
} from "../schemas";

const router = express.Router();

router.post("/api/users", validateRequestData(createUserSchema), createUserHandler);
router.post("/api/users/verify", validateRequestData(sendVerificationEmailSchema), sendVerificationEmailHandler);
router.get("/api/users/verify/:id/:verificationCode", validateRequestData(verifyUserSchema), verifyUserHandler);
router.post("/api/users/password", validateRequestData(sendPasswordResetEmailSchema), sendPasswordResetEmailHandler);
router.get(
  "/api/users/password/:passwordResetCode/:password",
  validateRequestData(passwordResetSchema),
  passwordResetHandler
);
router.get("/api/users/me", requireAuth, getUserHandler);
router.post("/api/users/update", [requireAuth, validateRequestData(updateUserSchema)], updateUserHandler);

export default router;
