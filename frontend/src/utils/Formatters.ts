import { AxiosResponse } from "axios";
import { IBook } from "../models/BookModel";

export const formatToBookModel = (bookListResult: AxiosResponse): IBook[] => {
  return (
    bookListResult.data.items &&
    bookListResult.data.items.map((item: any) => {
      return {
        title: item.volumeInfo.title && item.volumeInfo.title,
        author: item.volumeInfo.authors && item.volumeInfo.authors[0],
        img_url:
          item.volumeInfo.imageLinks && item.volumeInfo.imageLinks.thumbnail,
      };
    })
  );
};
