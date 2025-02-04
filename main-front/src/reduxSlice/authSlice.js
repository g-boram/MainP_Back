import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { SERVER_URL } from "../constants/urlList";

// 로그인
// Thunk: 로그인 API 호출 및 상태 업데이트
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, thunkAPI) => {
    try {
      const req = { email: email, password: password };
      const response = await axios.post(`${SERVER_URL.LOCAL}/auth/login`, req);
      const token = response.data.token;
      const user = response.data.user;

      // JWT 토큰을 localStorage에 저장
      sessionStorage.setItem("jwtToken", token);
      sessionStorage.setItem("user", JSON.stringify(user));

      return {
        user: response.data.user,
        token: token,
      };
    } catch (error) {
      console.error("Login Error :", error);
      return thunkAPI.rejectWithValue(
        error.response ? error.response.data : "Something went wrong"
      );
    }
  }
);

const sessionToken = JSON.parse(sessionStorage.getItem("token"));
const sessionUser = JSON.parse(sessionStorage.getItem("user"));

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: sessionUser ? sessionUser : null,
    token: sessionToken ? sessionToken : null,
    isLoading: false,
    error: null,
  },
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
      sessionStorage.removeItem("jwtToken");
      sessionStorage.removeItem("user");
    },
    resetLoginState: (state) => {
      state.isLoading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;

        // console.log("Logged in successfully:", action.payload);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

export const { logout, resetLoginState } = authSlice.actions;
export default authSlice.reducer;
