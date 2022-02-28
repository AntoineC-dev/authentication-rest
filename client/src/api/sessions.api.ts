import { CreateSessionInput } from "../validators";
import axiosInstance from "./config.api";

export async function createSessionRequest(payload: CreateSessionInput) {
  return axiosInstance.post("/sessions", payload);
}

export async function invalidateSessionRequest() {
  return axiosInstance.delete("/sessions");
}

export async function invalidateAllSessionsRequest() {
  return axiosInstance.delete("/sessions/clear");
}
