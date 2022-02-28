// String errors
export const requiredError = (name: string) => `${name} is required`;
export const trimError = (name: string) => `${name} unauthorized whitespace(s)`;
// Email format
export const invalidEmailError = "Not a valid email";
// Password errors
export const passwordTooShortError = (min: number) => `Password too short. Must me at least ${min} characters`;
export const passwordTooWeakError =
  "Password must contain at least 1 lowercase & uppercase alphabetical character, 1 numeric character & 1 special character";
export const passwordsDoNotMatchError = "Passwords do not match";
