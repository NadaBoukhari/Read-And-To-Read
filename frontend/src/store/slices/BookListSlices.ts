import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Book {
  id: string;
  title: string;
  author: string;
  review?: string;
  rating?: number;
  img_url?: string;
  index?: number;
}

export interface BookListState {
  booklist: Book[];
  visible: boolean;
}

const initialState: BookListState = {
  booklist: [],
  visible: false,
};

export const bookListSlice = createSlice({
  name: "bookList",
  initialState,
  reducers: {
    getBookList: (state, action: PayloadAction<Book[]>) => {
      state.booklist = action.payload;
      state.visible = true;
    },
    addBook: (state, action: PayloadAction<Book>) => {
      state.booklist.unshift(action.payload);
    },
    deleteBook: (state, action: PayloadAction<string>) => {
      state.booklist = state.booklist.filter((book) => {
        return book.id !== action.payload;
      });
    },
    toggleVisible: (state, action: PayloadAction<boolean>) => {
      state.visible = action.payload;
    },
  },
});

export const { getBookList, addBook, deleteBook, toggleVisible } =
  bookListSlice.actions;
export default bookListSlice.reducer;
