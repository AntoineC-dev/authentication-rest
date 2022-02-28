import { object, string, TypeOf } from "zod";
import { invalidEmailError, requiredError } from "./errors.validators";

export const createSessionSchema = object({
  email: string({
    required_error: requiredError("Email"),
  })
    .nonempty(requiredError("Email"))
    .email(invalidEmailError),
  password: string({
    required_error: requiredError("Password"),
  }).nonempty(requiredError("Password")),
});

export type CreateSessionInput = TypeOf<typeof createSessionSchema>;
