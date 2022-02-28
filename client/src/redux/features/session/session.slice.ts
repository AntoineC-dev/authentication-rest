import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store.redux";

export interface UserState {
  _id: string;
  username: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface SessionState {
  authenticated: boolean;
  user: UserState | null;
}

const initialState: SessionState = {
  authenticated: false,
  user: null,
};

export const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
    setSessionAction: (state, action: PayloadAction<UserState | null>) => {
      const authenticated = action.payload !== null;
      state.authenticated = authenticated;
      state.user = action.payload;
    },
  },
});

export const { setSessionAction } = sessionSlice.actions;

export const selectAuthenticated = (state: RootState) => state.session.authenticated;
export const selectUser = (state: RootState) => state.session.user;

export default sessionSlice.reducer;
