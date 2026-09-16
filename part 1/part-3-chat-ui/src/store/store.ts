
import { configureStore } from "@reduxjs/toolkit";
import chatReducer from "./chatSlice";

// =========== Redux Store Configuration =========== //

export const store = configureStore({
  reducer: {
    chat: chatReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;