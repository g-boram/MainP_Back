// src/features/pagination/paginationSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentPage: 0, // 현재 페이지 (0-based index)
  itemsPerPage: 10, // 페이지당 아이템 수
  totalItems: 0, // 총 아이템 수
};

const paginationSlice = createSlice({
  name: "pagination",
  initialState,
  reducers: {
    setPage: (state, action) => {
      state.currentPage = action.payload; // 현재 페이지 업데이트
    },
    setItemsPerPage: (state, action) => {
      state.itemsPerPage = action.payload; // 페이지당 아이템 수 업데이트
    },
    setTotalItems: (state, action) => {
      state.totalItems = action.payload; // 총 아이템 수 업데이트
    },
    resetPagination: () => initialState, // 초기 상태로 리셋
  },
});

export const { setPage, setItemsPerPage, setTotalItems, resetPagination } = paginationSlice.actions;

export default paginationSlice.reducer;
