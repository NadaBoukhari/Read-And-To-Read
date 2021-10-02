import {
  BookListState,
  BookListAction,
  GET_BOOKLIST,
  ADD_BOOK,
  DELETE_BOOK,
} from "../types";

const initialState: BookListState = { data: { bookList: [] } };

const BookListReducer = (
  state = initialState,
  action: BookListAction
): BookListState => {
  switch (action.type) {
    case GET_BOOKLIST:
      return {
        data: action.payload,
      };
    case ADD_BOOK:
      return {
        ...state,
        data: { bookList: [action.payload, ...state.data.bookList] },
      };
    case DELETE_BOOK:
      const newBooklist = state.data.bookList.filter((book) => {
        return book.id !== action.id;
      });
      return { ...state, data: { bookList: newBooklist } };
    default:
      return state;
  }
};

export default BookListReducer;
