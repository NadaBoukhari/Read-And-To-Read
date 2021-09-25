import { FC, useState, useEffect } from "react";
import { AutoComplete, Image } from "antd";
import axios from "axios";
import { IBook } from "../models/BookListModel";
const { Option } = AutoComplete;

interface AddBookState extends IBook {
  index: number | undefined;
}

const AddNewBook: FC = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [filteredSuggestions, setFilteredSuggestions] = useState<
    AddBookState[]
  >([]);

  useEffect(() => {
    const fetchBooks = async () => {
      var temp = inputValue && inputValue.replace(/\s/g, "+");

      await axios
        .get(
          `https://www.googleapis.com/books/v1/volumes?q=${temp}&langRestrict=en&maxResults=3`
        )
        .then((response) => {
          const suggestions: AddBookState[] =
            response.data.items &&
            response.data.items.map((item: any, index: any) => {
              return {
                title: item.volumeInfo.title && item.volumeInfo.title,
                author: item.volumeInfo.authors && item.volumeInfo.authors[0],
                img_url:
                  item.volumeInfo.imageLinks &&
                  item.volumeInfo.imageLinks.thumbnail,
                index: index,
              };
            });

          setFilteredSuggestions(suggestions);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    fetchBooks();
  }, [inputValue]);

  const clearState = () => {
    setInputValue("");
    setFilteredSuggestions([]);
  };

  const handleAutocompleteSelect = (value: string, option: any) => {
    const newBook = filteredSuggestions.find(
      (book: AddBookState) => book.index === parseInt(option.key)
    );

    axios
      .post<IBook>("http://localhost:8080/books/add-book", newBook)
      .then((response) => {
        console.log(response);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <AutoComplete
        size="middle"
        style={{
          display: "flex",
          float: "right",
          margin: "2vh",
          width: "25%",
        }}
        filterOption={(inputValue, option) =>
          option!.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
        }
        onChange={(e) => setInputValue(e)}
        value={inputValue}
        placeholder="Add new book..."
        allowClear={true}
        onClear={clearState}
        onSelect={(value, option) => handleAutocompleteSelect(value, option)}
      >
        {inputValue !== undefined
          ? filteredSuggestions &&
            filteredSuggestions.map((suggest: AddBookState) => (
              <Option key={suggest.index} value={suggest.title}>
                <div style={{ display: "flex", alignItems: "start" }}>
                  <Image
                    src={suggest.img_url}
                    width={"8vh"}
                    height={"11vh"}
                    preview={false}
                  />
                  <p style={{ padding: "0.5vh" }}>
                    {/*// TODO: Make the title text wrap if title is too long */}
                    <span
                      style={{
                        display: "block",
                        color: "black",
                        fontSize: "1vw",
                        fontWeight: 600,
                        width: "1vh",
                      }}
                    >
                      {suggest.title}
                    </span>
                    <span
                      style={{
                        display: "block",
                        color: "black",
                        fontSize: "0.8vw",
                        fontWeight: "normal",
                      }}
                    >
                      {suggest.author}
                    </span>
                  </p>
                </div>
              </Option>
            ))
          : null}
      </AutoComplete>
    </>
  );
};

export default AddNewBook;
