import { createSlice } from "@reduxjs/toolkit";

export interface AuthState {
  isLoading: boolean;
  session: {
    id: string;
    name: string;
    avatar: string;
  } | null;
}

const initialState: AuthState = {
  isLoading: false,
  session: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoading: (state, { payload }) => {
      state.isLoading = payload;
    },
    setSession: (state, { payload }) => {
      state.session = { ...state.session, ...payload };
    },
    clearSession: (state) => {
      state.session = null;
    },
  },
});

export const { setLoading, setSession, clearSession } = authSlice.actions;

export default authSlice.reducer;
