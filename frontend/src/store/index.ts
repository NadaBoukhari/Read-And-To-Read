import { configureStore } from "@reduxjs/toolkit";
import BookListReducer from "./slices/BookListSlices";
import DisplayBookReducer from "./slices/DisplayBookSlice";

export const store = configureStore({
  reducer: {
    bookList: BookListReducer,
    displayBook: DisplayBookReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
