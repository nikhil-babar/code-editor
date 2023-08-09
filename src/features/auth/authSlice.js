import {
  createSlice,
  createAsyncThunk,
  createSelector,
} from "@reduxjs/toolkit";
import { axiosClient } from "../../axiosClient";

export const AUTH_STATUS = {
  success: "SUCCESS",
  failure: "FAILURE",
  loading: "LOADING",
  idle: "IDLE",
};

const initialState = {
  google: null,
  github: null,
  status: AUTH_STATUS.idle,
};

export const fetchAuthState = createAsyncThunk(
  "auth/fetch-auth-state",
  async () => {
    let res = {};
    let error = {};

    try {
      res.google = (
        await axiosClient.get("/auth/google_auth_status")
      ).data?.user;
    } catch (err) {
      error.google = err;
    }

    try {
      res.github = (
        await axiosClient.get("/auth/github_auth_status")
      ).data?.user;
    } catch (err) {
      error.github = err;
    }

    if (!res.google && !res.github) {
      return Promise.reject(JSON.stringify(error));
    }

    return res;
  }
);

export const logout = createAsyncThunk("/auth/logout", async () => {
  try {
    await axiosClient.delete("/auth/logout");
  } catch (error) {
    return Promise.reject(error.message);
  }
});

const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAuthState.fulfilled, (state, action) => {
        state.google = action.payload.google;
        state.github = action.payload.github;
        state.status = AUTH_STATUS.success;
      })
      .addCase(fetchAuthState.pending, (state) => {
        state.status = AUTH_STATUS.loading;
      })
      .addCase(fetchAuthState.rejected, (state) => {
        state.status = AUTH_STATUS.failure;
      })
      .addCase(logout.fulfilled, (state) => {
        state.google = null;
        state.github = null;
        state.status = AUTH_STATUS.idle;
      });
  },
});

export const googleAuthSelector = createSelector(
  [(state) => state?.google],
  (state) => state
);

export const githubAuthSelector = createSelector(
  [(state) => state?.github],
  (state) => state
);

export const authStatusSelector = createSelector(
  [(state) => state?.status],
  (state) => state
);

export default AuthSlice.reducer;
