import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IBook } from "../../models/BookModel";

export interface BookListState {
  bookList: IBook[];
  visible: boolean;
  selectedBook: IBook;
}

const initialState: BookListState = {
  bookList: [],
  visible: false,
  selectedBook: { id: "", title: "", author: "" },
};

export const bookListSlice = createSlice({
  name: "bookList",
  initialState,
  reducers: {
    getBookList: (state, action: PayloadAction<IBook[]>) => {
      state.bookList = action.payload;
      state.visible = true;
    },
    addBook: (state, action: PayloadAction<IBook>) => {
      state.bookList.unshift(action.payload);
    },
    deleteBook: (state, action: PayloadAction<string>) => {
      state.bookList = state.bookList.filter((book) => {
        return book.id !== action.payload;
      });
    },
    toggleVisible: (state, action: PayloadAction<boolean>) => {
      state.visible = action.payload;
    },
    setSelectedBook: (state, action: PayloadAction<IBook>) => {
      state.selectedBook = action.payload;
    },
  },
});

export const {
  getBookList,
  addBook,
  deleteBook,
  toggleVisible,
  setSelectedBook,
} = bookListSlice.actions;
export default bookListSlice.reducer;
