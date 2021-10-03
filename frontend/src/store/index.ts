import { configureStore } from "@reduxjs/toolkit";
import BookListReducer from "./slices/BookListSlices";

export const store = configureStore({
  reducer: {
    bookList: BookListReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
