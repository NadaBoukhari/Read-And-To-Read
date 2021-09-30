import { FC, useState } from "react";
import { AutoComplete } from "antd";
import { IBook } from "../models/BookModel";

interface ISearchBookAutocompleteProps {
  bookList: IBook[];
  bookListDefault: IBook[];
  setSelectedBook: (book: IBook) => void;
  setBookList: (booklist: IBook[]) => void;
}

const SearchBookAutocomplete: FC<ISearchBookAutocompleteProps> = ({
  bookList,
  bookListDefault,
  setBookList,
  setSelectedBook,
}) => {
  const [input, setInput] = useState<string>("");
  const setNewBook = (option: any) => {
    const newBook: IBook = {
      id: option.id,
      title: option.value,
      author: option.author,
      review: option.review,
      rating: option.rating,
      img_url: option.img_url,
    };
    setSelectedBook(newBook);
  };

  const updateInput = async (input: string) => {
    const filtered = bookListDefault.filter((book) => {
      return (
        book.title.toLowerCase().includes(input && input.toLowerCase()) ||
        book.author.toLowerCase().includes(input && input.toLowerCase())
      );
    });
    setInput(input);
    setBookList(filtered);
  };

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <AutoComplete
        style={{
          width: "80%",
          marginTop: "1vh",
        }}
        options={bookList.map((book) => ({
          id: book.id,
          value: book.title,
          author: book.author,
          review: book.review,
          rating: book.rating,
          img_url: book.img_url,
        }))}
        placeholder="Search by title or author..."
        value={input}
        onChange={(e) => updateInput(e)}
        showSearch={true}
        onSelect={(value, option) => setNewBook(option)}
        dropdownStyle={{ maxHeight: "40vh", overflow: "auto" }}
      />
    </div>
  );
};

export default SearchBookAutocomplete;
