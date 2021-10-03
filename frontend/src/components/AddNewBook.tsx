import { FC, useEffect, useState } from "react";
import { AutoComplete, Image, Modal, message } from "antd";
import { IBook } from "../models/BookModel";
import ApiCalls from "../api/ApiCalls";
import { formatToBookModel } from "../utils/Formatters";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { addBook, toggleVisible } from "../store/slices/BookListSlices";
const { Option } = AutoComplete;
const { confirm } = Modal;

const AddNewBook: FC = () => {
  const dispatch = useDispatch();
  const [bookSuggestions, setBookSuggestions] = useState<IBook[]>([]);
  const [inputValue, setInputValue] = useState<string>("");

  useEffect(() => {
    if (inputValue !== "") {
      var searchTerm = inputValue && inputValue.replace(/\s/g, "+");
      ApiCalls.searchGoogleBooksList(searchTerm)
        .then((response) => {
          setBookSuggestions(formatToBookModel(response));
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [inputValue, setBookSuggestions]);

  const clearState = () => {
    setInputValue("");
    setBookSuggestions([]);
  };

  const handleAutocompleteSelect = (indexValue: number) => {
    const newBook = bookSuggestions.find(
      (book: IBook, index: number) => index === indexValue
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
          <img src={newBook.img_url} alt="" />
        </div>
      ),
      onOk() {
        ApiCalls.addBook(newBook)
          .then((response) => {
            dispatch(addBook(response.data));
            clearState();
            message.success(
              `Successfully added ${newBook.title} to reading list.`,
              1.5
            );
            dispatch(toggleVisible(true));
          })
          .catch((err) => console.log(err));
      },
    });
  };

  return (
    <div
      style={{
        display: "flex",
        float: "right",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
      }}
    >
      <AutoComplete
        filterOption={(inputValue, option) =>
          option!.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
        }
        style={{ width: "15vw", marginRight: "1vw" }}
        onChange={(e) => setInputValue(e)}
        value={inputValue}
        placeholder="Add new book..."
        allowClear={true}
        onClear={clearState}
        onSelect={(value, option) => setInputValue(inputValue)}
      >
        {inputValue !== undefined
          ? bookSuggestions &&
            bookSuggestions.map((bookSuggestion: IBook, index: number) => (
              <Option key={index} value={bookSuggestion.title}>
                <div
                  style={{ display: "flex", alignItems: "start" }}
                  onClick={() => handleAutocompleteSelect(index)}
                >
                  <Image
                    src={bookSuggestion.img_url}
                    width={"8vh"}
                    height={"11vh"}
                    preview={false}
                  />
                  <p style={{ padding: "0.5vh" }}>
                    <span
                      style={{
                        display: "block",
                        color: "black",
                        fontSize: "1vw",
                        fontWeight: 600,
                        width: "1vh",
                      }}
                    >
                      {bookSuggestion.title}
                    </span>
                    <span
                      style={{
                        display: "block",
                        color: "black",
                        fontSize: "0.8vw",
                        fontWeight: "normal",
                      }}
                    >
                      {bookSuggestion.author}
                    </span>
                  </p>
                </div>
              </Option>
            ))
          : null}
      </AutoComplete>
    </div>
  );
};

export default AddNewBook;
