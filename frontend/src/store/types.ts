export const GET_BOOKLIST = "GET_BOOKLIST";
export const ADD_BOOK = "ADD_BOOK";
export const DELETE_BOOK = "DELETE_BOOK";

export interface BookList {
  bookList: Book[];
}

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
  data: BookList;
}

interface GetBookListAction {
  type: typeof GET_BOOKLIST;
  payload: BookList;
}

export interface BookState {
  data: Book | null;
}

interface AddBookAction {
  type: typeof ADD_BOOK;
  payload: Book;
}

interface DeleteBookAction {
  type: typeof DELETE_BOOK;
  id: string;
}

export type BookListAction =
  | GetBookListAction
  | AddBookAction
  | DeleteBookAction;
