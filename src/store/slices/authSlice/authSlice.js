import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    status: "checking",
    uid: null,
    name: null,
    errorMessage: null,
  },
  reducers: {
    login: (state, { payload }) => {
      state.status = "authenticated";
      state.uid = payload.uid;
      state.name = payload.displayName;
      state.errorMessage = null;
    },
    logout: (state, { payload }) => {
      // console.log("logging out");
      state.status = "not-authenticated";
      state.uid = null;
      state.name = null;
      state.errorMessage = payload?.errorMessage || null;
    },
    checkingCredentials: (state) => {
      state.status = "checking";
    },
  },
});

// Action creators are generated for each case reducer function
export const { login, logout, checkingCredentials } = authSlice.actions;
