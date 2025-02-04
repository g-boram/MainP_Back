import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { SERVER_URL } from "../constants/urlList";

// 회원가입
export const registerUser = createAsyncThunk("auth/register", async (newUser, thunkAPI) => {
  try {
    const response = await axios.post(`${SERVER_URL.LOCAL}/auth/register`, newUser);

    // API 응답 구조 확인 후 필요한 데이터를 반환
    return response.data;
  } catch (error) {
    console.error("Login Error :", error);
    return thunkAPI.rejectWithValue(error.response ? error.response.data : "관리자에게 문의해주세요");
  }
});

const registerSlice = createSlice({
  name: "register",
  initialState: {
    message: null,
    isLoading: false,
    error: null,
  },
  reducers: {
    resetRegisterState: (state) => {
      state.message = null;
      state.isLoading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.message = action.payload.message;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

export const { resetRegisterState } = registerSlice.actions;
export default registerSlice.reducer;
