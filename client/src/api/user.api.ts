import {
  CreateUserInput,
  PasswordResetRequestInput,
  SendEmailInput,
  UpdateUserInput,
  VerifyUserInput,
} from "../validators";
import axiosInstance from "./config.api";

export async function createUserRequest(payload: CreateUserInput) {
  return axiosInstance.post("/users", payload);
}

export async function getUserRequest() {
  return axiosInstance.get("/users/me");
}

export async function passwordResetRequest(payload: PasswordResetRequestInput) {
  return axiosInstance.get(`/users/password/${payload.passwordResetCode}/${payload.password}`);
}

export async function sendPasswordResetEmailRequest(payload: SendEmailInput) {
  return axiosInstance.post("/users/password", payload);
}

export async function sendVerificationEmailRequest(payload: SendEmailInput) {
  return axiosInstance.post("/users/verify", payload);
}

export async function updateUserRequest(payload: UpdateUserInput) {
  return axiosInstance.post("/users/update", payload);
}

export async function verifyUserRequest(params: VerifyUserInput) {
  const { id, verificationCode } = params;
  return axiosInstance.get(`/users/verify/${id}/${verificationCode}`);
}
