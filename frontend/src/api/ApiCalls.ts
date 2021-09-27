import axios from "axios";
import { IBook } from "../models/BookModel";

export default class ApiCalls {
  private static defaultHeaders = { "Content-Type": "application/json" };

  public static searchGoogleBooksList = (searchTerm: string = "") => {
    return axios.get(
      `https://www.googleapis.com/books/v1/volumes?q="${searchTerm}"&langRestrict=en&maxResults=10`,
      { headers: this.defaultHeaders }
    );
  };

  public static getAllBooks = () => {
    return axios.get<IBook[]>("http://localhost:8080/books/all", {
      headers: this.defaultHeaders,
    });
  };

  public static deleteBook = (id: string) => {
    return axios.delete(`http://localhost:8080/books/delete-book/${id}`, {
      headers: this.defaultHeaders,
    });
  };

  public static addBook = (book: IBook) => {
    return axios.post("http://localhost:8080/books/add-book", book, {
      headers: this.defaultHeaders,
    });
  };
}
