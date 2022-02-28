import toast from "react-hot-toast";
import {
  createSessionRequest,
  getUserRequest,
  handleAxiosError,
  invalidateSessionRequest,
  passwordResetRequest,
  updateUserRequest,
} from "../../../api";
import { CreateSessionInput, PasswordResetRequestInput, UpdateUserInput } from "../../../validators";
import { AppThunk } from "../../store.redux";
import { setSessionAction } from "./session.slice";

export const loginThunk =
  (payload: CreateSessionInput): AppThunk =>
  async (dispatch) => {
    try {
      await createSessionRequest(payload);
      const response = await getUserRequest();
      dispatch(setSessionAction(response.data.data));
      return toast.success(response.data.message);
    } catch (error) {
      return toast.error(handleAxiosError(error));
    }
  };

export const logoutThunk = (): AppThunk => async (dispatch) => {
  try {
    const response = await invalidateSessionRequest();
    dispatch(setSessionAction(null));
    return toast.success(response.data.message);
  } catch (error) {
    return toast.error(handleAxiosError(error));
  }
};

export const passwordResetThunk =
  (payload: PasswordResetRequestInput): AppThunk =>
  async (dispatch) => {
    try {
      const response = await passwordResetRequest(payload);
      dispatch(setSessionAction(null));
      return toast.success(response.data.message);
    } catch (error) {
      return toast.error(handleAxiosError(error));
    }
  };

export const updateUserThunk =
  (payload: UpdateUserInput): AppThunk =>
  async (dispatch) => {
    try {
      const response = await updateUserRequest(payload);
      dispatch(setSessionAction(response.data.data));
      return toast.success(response.data.message);
    } catch (error) {
      return toast.error(handleAxiosError(error));
    }
  };
