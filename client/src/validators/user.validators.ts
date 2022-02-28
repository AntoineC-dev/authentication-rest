import { object, string, TypeOf } from "zod";
import {
  invalidEmailError,
  passwordsDoNotMatchError,
  passwordTooShortError,
  passwordTooWeakError,
  requiredError,
  trimError,
} from "./errors.validators";

export const createUserSchema = object({
  username: string({
    required_error: requiredError("Username"),
  })
    .nonempty(requiredError("Username"))
    .refine((data) => data === data.trim(), { message: trimError("Username") }),
  email: string({
    required_error: requiredError("Email"),
  }).email(invalidEmailError),
  password: string({
    required_error: requiredError("Password"),
  })
    .min(8, passwordTooShortError(8))
    .regex(RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])"), {
      message: passwordTooWeakError,
    }),
  passwordConfirmation: string({
    required_error: requiredError("Password confirmation"),
  }),
}).refine((data) => data.password === data.passwordConfirmation, {
  message: passwordsDoNotMatchError,
  path: ["passwordConfirmation"],
});

export const passwordResetSchema = object({
  password: string({
    required_error: requiredError("Password"),
  })
    .min(8, passwordTooShortError(8))
    .regex(RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])"), {
      message: passwordTooWeakError,
    }),
  passwordConfirmation: string({
    required_error: requiredError("Password confirmation"),
  }),
}).refine((data) => data.password === data.passwordConfirmation, {
  message: passwordsDoNotMatchError,
  path: ["passwordConfirmation"],
});

export const sendEmailSchema = object({
  email: string({
    required_error: requiredError("Email"),
  }).email(invalidEmailError),
});

export const updateUserSchema = object({
  username: string({
    required_error: requiredError("Username"),
  })
    .nonempty(requiredError("Username"))
    .refine((data) => data === data.trim(), { message: trimError("Username") }),
  email: string({
    required_error: requiredError("Email"),
  }).email(invalidEmailError),
});

export const verifyUserSchema = object({
  id: string(),
  verificationCode: string(),
});

export type CreateUserInput = TypeOf<typeof createUserSchema>;
export type PasswordResetInput = TypeOf<typeof passwordResetSchema>;
export type PasswordResetRequestInput = Omit<PasswordResetInput, "passwordConfirmation"> & {
  passwordResetCode: string;
};
export type SendEmailInput = TypeOf<typeof sendEmailSchema>;
export type UpdateUserInput = TypeOf<typeof updateUserSchema>;
export type VerifyUserInput = TypeOf<typeof verifyUserSchema>;
