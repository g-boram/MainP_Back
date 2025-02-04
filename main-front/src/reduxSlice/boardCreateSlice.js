import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { SERVER_URL } from "../constants/urlList";
import axios from "axios";

// ****************************** //
// 게시판 생성 Thunk
// ****************************** //
export const createBoard = createAsyncThunk("board/createBoard", async (formTotalData, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${SERVER_URL.LOCAL}/board`, formTotalData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || "An unexpected error occurred");
  }
});

const boardCreateSlice = createSlice({
  name: "boardCreate",
  initialState: {
    isLoading: false,
    board: null,
    error: null,
  },
  reducers: {
    resetBoardState: (state) => {
      state.isLoading = false;
      state.board = null;
      state.error = null;
    },
  }, // 추가 리듀서가 필요하다면 작성
  extraReducers: (builder) => {
    builder
      // createBoard Pending
      .addCase(createBoard.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      // createBoard Fulfilled
      .addCase(createBoard.fulfilled, (state, action) => {
        state.isLoading = false;
        state.board = action.payload;
      })
      // createBoard Rejected
      .addCase(createBoard.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { resetBoardState } = boardCreateSlice.actions;
export default boardCreateSlice.reducer;
