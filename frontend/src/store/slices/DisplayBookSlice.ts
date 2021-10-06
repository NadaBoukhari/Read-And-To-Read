import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IBook } from "../../models/BookModel";

export interface DisplayBookState {
  displayBook: IBook;
}

const initialState: DisplayBookState = {
  displayBook: { id: "", title: "", author: "" },
};

export const displayBookSlice = createSlice({
  name: "displayBook",
  initialState,
  reducers: {
    setDisplayBook: (state, action: PayloadAction<IBook>) => {
      state.displayBook = action.payload;
    },
  },
});

export const { setDisplayBook } = displayBookSlice.actions;
export default displayBookSlice.reducer;
