import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

import BookListReducer from "./reducers/bookListReducer";

const RootReducer = combineReducers({
  bookList: BookListReducer,
});

const store = createStore(
  RootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export type RootState = ReturnType<typeof RootReducer>;

export default store;
