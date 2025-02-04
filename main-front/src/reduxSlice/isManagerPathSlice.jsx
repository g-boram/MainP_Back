import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isManager: false,
};

const isManagerPathSlice = createSlice({
  name: "isManagerPath", // slice 이름
  initialState, // 초기 상태
  reducers: {
    // 리듀서 함수
    isManagerPath: (state, action) => {
      state.isManager = action.payload;
    },
  },
});

// 액션과 리듀서 내보내기
export const { isManagerPath } = isManagerPathSlice.actions;
export default isManagerPathSlice.reducer;
