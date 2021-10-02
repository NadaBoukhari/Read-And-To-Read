import { ThunkAction } from "redux-thunk";
import { RootState } from "..";
import {
  BookListAction,
  BookList,
  GET_BOOKLIST,
  Book,
  ADD_BOOK,
  DELETE_BOOK,
} from "../types";
import ApiCalls from "../../api/ApiCalls";

export const getBookList = (): ThunkAction<
  void,
  RootState,
  null,
  BookListAction
> => {
  return (dispatch) => {
    try {
      ApiCalls.getAllBooks().then((response) => {
        const resData: BookList = { bookList: [] };
        resData.bookList = response.data;

        dispatch({ type: GET_BOOKLIST, payload: resData });
      });
    } catch (err: any) {
      console.log(err.message);
    }
  };
};

export const addBook = (
  book: Book
): ThunkAction<void, RootState, null, BookListAction> => {
  return (dispatch) => {
    dispatch({ type: ADD_BOOK, payload: book });
  };
};

export const deleteBook = (
  id: string
): ThunkAction<void, RootState, null, BookListAction> => {
  return (dispatch) => {
    dispatch({ type: DELETE_BOOK, id: id });
  };
};
