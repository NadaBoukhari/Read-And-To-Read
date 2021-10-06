import { AxiosResponse } from "axios";
import { IBook } from "../models/BookModel";

export const formatToBookModel = (bookListResult: AxiosResponse): IBook[] => {
  return (
    bookListResult.data.items &&
    bookListResult.data.items.map((item: any) => {
      const img_url =
        item.volumeInfo.imageLinks &&
        item.volumeInfo.imageLinks.thumbnail.replace("&edge=curl", "");
      return {
        title: item.volumeInfo.title && item.volumeInfo.title,
        author: item.volumeInfo.authors && item.volumeInfo.authors[0],
        img_url: img_url,
        description: item.volumeInfo.description && item.volumeInfo.description,
      };
    })
  );
};
