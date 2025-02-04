import { configureStore } from "@reduxjs/toolkit";
import isManagerPathReducer from "./reduxSlice/isManagerPathSlice";
import authReducer from "./reduxSlice/authSlice";
import registerReducer from "./reduxSlice/registerSlice";
import boardCreateReducer from "./reduxSlice/boardCreateSlice";
import boardListReducer from "./reduxSlice/boardListSlice";
import paginationReducer from "./reduxSlice/paginationSlice";
import carSellSliceReducer from "./reduxSlice/carSellSlice";

export const store = configureStore({
  reducer: {
    isManagerPath: isManagerPathReducer,
    auth: authReducer,
    register: registerReducer,
    boardCreate: boardCreateReducer,
    boardList: boardListReducer,
    pagination: paginationReducer,
    carSell: carSellSliceReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [],
        ignoredPaths: ["board.file"],
      },
    }),
});

export default store;
