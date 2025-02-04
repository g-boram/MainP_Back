import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { SERVER_URL } from "../constants/urlList";
import axios from "axios";

// 온라인 신청서 비동기 작업
export const getAllCarSellList = createAsyncThunk("api/carsell", async (_, thunkAPI) => {
  try {
    const response = await axios.get(`${SERVER_URL.LOCAL}/api/carsell`);
    return response.data;
  } catch (error) {
    console.error("Car sell List Error :", error);
    return thunkAPI.rejectWithValue(error.response ? error.response.data : "관리자에게 문의해주세요.");
  }
});

// Slice 정의
const carSellSlice = createSlice({
  name: "carSell",
  initialState: {
    message: null,
    isLoading: false,
    error: null,
    carSellList: [],
    notSellerList: [],
  },
  reducers: {
    resetCarSellState: (state) => {
      state.message = null;
      state.isLoading = false;
      state.error = null;
      state.carSellList = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllCarSellList.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(getAllCarSellList.fulfilled, (state, action) => {
        state.isLoading = false;

        const data = action.payload;

        state.carSellList = data;
        state.notSellerList = data.filter((v) => v.sellerId === null);
        state.message = action.payload.message || "데이터가 성공적으로 로드되었습니다.";
      })
      .addCase(getAllCarSellList.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "데이터를 불러오는 중 문제가 발생했습니다.";
        state.message = null;
      });
  },
});

export const { resetCarSellState } = carSellSlice.actions;
export default carSellSlice.reducer;
