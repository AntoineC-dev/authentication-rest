import { object, string, TypeOf } from "zod";
import {
  invalidEmailError,
  passwordsDoNotMatchError,
  passwordTooShortError,
  passwordTooWeakError,
  requiredError,
  trimError,
} from "./errors.schema";

export const createUserSchema = object({
  body: object({
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
  }),
});

export const passwordResetSchema = object({
  params: object({
    password: string({
      required_error: requiredError("Password"),
    })
      .min(8, passwordTooShortError(8))
      .regex(RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])"), {
        message: passwordTooWeakError,
      }),
    passwordResetCode: string({
      required_error: requiredError("Password reset code"),
    }),
  }),
});

export const sendPasswordResetEmailSchema = object({
  body: object({
    email: string({
      required_error: requiredError("Email"),
    }).email(invalidEmailError),
  }),
});

export const sendVerificationEmailSchema = object({
  body: object({
    email: string({
      required_error: requiredError("Email"),
    }).email(invalidEmailError),
  }),
});

export const updateUserSchema = object({
  body: object({
    username: string({
      required_error: requiredError("Username"),
    })
      .nonempty(requiredError("Username"))
      .refine((data) => data === data.trim(), { message: trimError("Username") }),
    email: string({
      required_error: requiredError("Email"),
    }).email(invalidEmailError),
  }),
});

export const verifyUserSchema = object({
  params: object({
    id: string(),
    verificationCode: string(),
  }),
});

export type CreateUserInput = Omit<TypeOf<typeof createUserSchema>["body"], "passwordConfirmation">;
export type PasswordResetInput = TypeOf<typeof passwordResetSchema>["params"];
export type SendPasswordResetEmailInput = TypeOf<typeof sendPasswordResetEmailSchema>["body"];
export type SendVerificationEmailInput = TypeOf<typeof sendVerificationEmailSchema>["body"];
export type UpdateUserInput = TypeOf<typeof updateUserSchema>["body"];
export type VerifyUserInput = TypeOf<typeof verifyUserSchema>["params"];
