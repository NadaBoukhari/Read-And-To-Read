import { configureStore } from "@reduxjs/toolkit";
import BookListReducerfrom from "./slices/BookListSlices";

export const store = configureStore({
  reducer: {
    booklist: BookListReducerfrom,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
