import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import { axiosClient as axios } from "../../axiosClient";

export const AUTH_STATUS = {
  success: "SUCCESS",
  failure: "FAILURE",
  loading: "LOADING",
  idle: "IDLE",
};

const fetchAuthState = createAsyncThunk(
  "auth/fetch-auth-state",
  async ({ code }) => {
    try {
      const res = await axios.get("/getAuthStatus", {
        params: {
          code,
        },
        withCredentials: true,
      });

      return res.data;
    } catch (error) {
      throw error;
    }
  }
);

const logout = createAsyncThunk("auth/logout", async () => {
  try {
    await axios.delete("/logout");
  } catch (error) {
    throw error;
  }
});

const AuthSlice = createSlice({
  name: "auth",
  initialState: {
    auth: null,
    signInStatus: AUTH_STATUS.idle,
    signOutStatus: AUTH_STATUS.idle,
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchAuthState.fulfilled, (state, action) => {
        state.signInStatus = AUTH_STATUS.success;
        state.signOutStatus = AUTH_STATUS.idle;
        state.auth = action.payload;
      })
      .addCase(fetchAuthState.pending, (state) => {
        state.signInStatus = AUTH_STATUS.loading;
      })
      .addCase(fetchAuthState.rejected, (state) => {
        state.signInStatus = AUTH_STATUS.failure;
      })
      .addCase(logout.pending, (state) => {
        state.signOutStatus = AUTH_STATUS.loading;
      })
      .addCase(logout.rejected, (state) => {
        state.signOutStatus = AUTH_STATUS.failure;
      })
      .addCase(logout.fulfilled, (state) => {
        state.signInStatus = AUTH_STATUS.success;
      });
  },
});

export const authSelector = createSelector(
  [(state) => state.auth],
  (state) => state.auth
);

export default AuthSlice.reducer;
