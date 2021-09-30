import { FC, useEffect, useState } from "react";
import { AutoComplete, Image, Modal } from "antd";
import { IBook } from "../models/BookModel";
import ApiCalls from "../api/ApiCalls";
import { formatToBookModel } from "../utils/Formatters";
import { ExclamationCircleOutlined } from "@ant-design/icons";
const { Option } = AutoComplete;
const { confirm } = Modal;

interface IAddNewBookProps {
  bookList: IBook[];
  setBookList: (books: IBook[]) => void;
}

const AddNewBook: FC<IAddNewBookProps> = ({ bookList, setBookList }) => {
  const [filteredSuggestions, setFilteredSuggestions] = useState<IBook[]>([]);
  const [inputValue, setInputValue] = useState<string>("");

  useEffect(() => {
    var searchTerm = inputValue && inputValue.replace(/\s/g, "+");
    ApiCalls.searchGoogleBooksList(searchTerm)
      .then((response) => {
        setFilteredSuggestions(formatToBookModel(response));
      })
      .catch((err) => {
        console.log(err);
      });
  }, [inputValue, setFilteredSuggestions]);

  const clearState = () => {
    setInputValue("");
    setFilteredSuggestions([]);
  };

  const handleAutocompleteSelect = (value: string, option: any) => {
    const newBook = filteredSuggestions.find(
      (book: IBook, index: number) => index === parseInt(option.key)
    );
    if (newBook !== undefined) {
      showConfirm(newBook);
    }
  };

  const showConfirm = (newBook: IBook) => {
    confirm({
      title: "Do you want to add this book ?",
      icon: <ExclamationCircleOutlined />,
      width: "25%",
      okText: "Yes",
      okType: "primary",
      content: (
        <div>
          <p>{newBook.title}</p>
          <p>{newBook.author}</p>
          <img src={newBook.img_url} />
        </div>
      ),
      onOk() {
        ApiCalls.addBook(newBook)
          .then(() => {
            setBookList([newBook, ...bookList]);
          })
          .catch((err) => console.log(err));
      },
    });
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
            filteredSuggestions.map((suggest: IBook, index: number) => (
              <Option key={index} value={suggest.title}>
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
