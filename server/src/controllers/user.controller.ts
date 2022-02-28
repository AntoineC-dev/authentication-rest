import { Request, Response } from "express";
import { omit } from "lodash";
import { nanoid } from "nanoid";
import { userPrivateFields } from "../models";
import {
  CreateUserInput,
  PasswordResetInput,
  SendPasswordResetEmailInput,
  SendVerificationEmailInput,
  UpdateUserInput,
  VerifyUserInput,
} from "../schemas";
import {
  createUser,
  getUserById,
  getUserByIdLean,
  getUserWhere,
  getUserWhereLean,
  invalidateAllSessions,
} from "../services";
import { clearCookies, logger, sendPasswordResetEmail, sendVerificationEmail } from "../utils";

export async function createUserHandler(req: Request<{}, {}, CreateUserInput>, res: Response) {
  try {
    const user = await createUser(req.body);
    await sendVerificationEmail(user);
    return res.status(201).send({ message: "Account created. Please verify your email." });
  } catch (error: any) {
    if (error.code && error.code === 11000) return res.status(409).send("Email already in use");
    logger.error(error, "Could not create user");
    return res.status(500).send(error);
  }
}

// RequireAuth
export async function getUserHandler(_: Request, res: Response) {
  const userId = res.locals.decoded.user;
  try {
    const user = await getUserByIdLean(userId);
    if (!user) return res.status(404).send("User not found");
    const formattedUser = omit(user, userPrivateFields);
    return res.send({
      message: `Welcome back ${formattedUser.username}`,
      data: formattedUser,
    });
  } catch (error: any) {
    logger.error(error, "Could not get user");
    return res.status(500).send(error);
  }
}

export async function passwordResetHandler(req: Request<PasswordResetInput>, res: Response) {
  const { password, passwordResetCode } = req.params;
  try {
    const user = await getUserWhere({ passwordResetCode });
    if (!user) return res.status(400).send("Could not reset password");
    user.passwordResetCode = null;
    user.password = password;
    await user.save();
    await invalidateAllSessions(user._id);
    clearCookies(res);
    return res.send({ message: "Password successfully updated" });
  } catch (error) {
    logger.error(error, "Could reset user password");
    return res.status(500).send(error);
  }
}

export async function sendPasswordResetEmailHandler(req: Request<{}, {}, SendPasswordResetEmailInput>, res: Response) {
  const message = "If a user with that email is registered, you will receive a password reset email";
  const { email } = req.body;
  try {
    const user = await getUserWhere({ email });
    if (!user) return res.send({ message });
    if (!user.verified) return res.status(403).send("User account not verified");
    const passwordResetCode = nanoid();
    user.passwordResetCode = passwordResetCode;
    await user.save();
    await sendPasswordResetEmail(user);
    return res.send({ message });
  } catch (error) {
    logger.error(error, "Could not send password reset email");
    return res.status(500).send(error);
  }
}

export async function sendVerificationEmailHandler(req: Request<{}, {}, SendVerificationEmailInput>, res: Response) {
  const message = "If a user with that email is registered, you will receive a verification email";
  const { email } = req.body;
  try {
    const user = await getUserWhereLean({ email });
    if (!user) return res.send({ message });
    if (user.verified) return res.send({ message: "User account already verified" });
    await sendVerificationEmail(user);
    return res.send({ message });
  } catch (error) {
    logger.error(error, "Could not send verification email");
    return res.status(500).send(error);
  }
}

// RequireAuth
export async function updateUserHandler(req: Request<{}, {}, UpdateUserInput>, res: Response) {
  const userId = res.locals.decoded.user;
  const { email, username } = req.body;
  try {
    const user = await getUserById(userId);
    if (!user) return res.status(404).send("User not found");
    const updatedUser = {
      username: username !== user?.username ? username : null,
      email: email !== user?.email ? email : null,
    };
    if (!updatedUser.email && !updatedUser.username) return res.status(400).send("Nothing to update");
    if (updatedUser.username) {
      user.username = updatedUser.username;
    }
    if (updatedUser.email) {
      user.email = updatedUser.email;
      await sendVerificationEmail(user);
    }
    user.save();
    if (updatedUser.email) {
      await invalidateAllSessions(userId);
      clearCookies(res);
      return res.send({ message: "Profile successfully updated. Please verify your email", data: null });
    }
    const formattedUser = omit(user, userPrivateFields);
    return res.send({ message: "Profile successfully updated", data: formattedUser });
  } catch (error) {
    logger.error(error, "Could not update user");
    return res.status(500).send(error);
  }
}

export async function verifyUserHandler(req: Request<VerifyUserInput>, res: Response) {
  const message = "Could not verify user account";
  const { id, verificationCode } = req.params;
  try {
    const user = await getUserById(id);
    if (!user) return res.status(400).send(message);
    if (user.verified) return res.send({ message: "User account already verified" });
    if (user.verificationCode === verificationCode) {
      user.verified = true;
      await user.save();
      return res.send({ message: "User account successfully verified" });
    }
    return res.status(400).send(message);
  } catch (error) {
    logger.error(error, "Could not verify user");
    return res.status(500).send(error);
  }
}
