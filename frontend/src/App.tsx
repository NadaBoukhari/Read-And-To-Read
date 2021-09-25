import "antd/dist/antd.css";
import "./App.css";
import { FC, useEffect, useState } from "react";
import ListItem from "./components/ListItem";
import { Layout, AutoComplete, List, Image, Button, Tooltip } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import axios from "axios";
import { IBook } from "./models/BookListModel";
import BookDisplay from "./components/BookDisplay";
import AddNewBook from "./components/AddNewBook";
const { Option } = AutoComplete;
const { Header, Sider } = Layout;

export interface IBookProps {
  bookList: IBook[];
}

export interface IBookDisplayProp {
  book: IBook | undefined;
}

const App: FC = () => {
  const [input, setInput] = useState<string>("");
  const [bookList, setBookList] = useState<IBook[]>([]);
  const [bookListDefault, setBookListDefault] = useState<IBook[]>([]);
  const [selectedBook, setSelectedBook] = useState<IBook>();

  const [inputValue, setInputValue] = useState<string>("");
  const [filteredSuggestions, setFilteredSuggestions] = useState<IBook[]>([]);

  useEffect(() => {
    const fetchBooks = async () => {
      var temp = inputValue && inputValue.replace(/\s/g, "+");

      await axios
        .get(
          `https://www.googleapis.com/books/v1/volumes?q=${temp}&langRestrict=en&maxResults=3`
        )
        .then((response) => {
          const suggestions: IBook[] =
            response.data.items &&
            response.data.items.map((item: any) => {
              return {
                title: item.volumeInfo.title && item.volumeInfo.title,
                author: item.volumeInfo.authors && item.volumeInfo.authors[0],
                img_url:
                  item.volumeInfo.imageLinks &&
                  item.volumeInfo.imageLinks.thumbnail,
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
      (book: IBook, index: number) => index === parseInt(option.key)
    );

    axios
      .post<IBook>("http://localhost:8080/books/add-book", newBook)
      .then((response) => {
        console.log(response);
      })
      .catch((err) => console.log(err));
    if (newBook !== undefined) {
      setBookList([newBook, ...bookList]);
    }
  };

  useEffect(() => {
    axios
      .get<IBook[]>("http://localhost:8080/books/all", {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setBookListDefault(response.data);
        setBookList(response.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

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

  const handleDeleteButton = (bookToDelete: IBook) => {
    axios
      .delete(`http://localhost:8080/books/delete-book/${bookToDelete.id}`)
      .then((response) => console.log(response))
      .catch((err) => console.log(err));

    const newBooklist = bookList.filter((book) => {
      return book.id !== bookToDelete.id;
    });

    setBookList(newBooklist);
  };

  return (
    <>
      <Layout>
        <Sider
          breakpoint="xs"
          collapsedWidth="0"
          width={"45vh"}
          style={{ overflow: "auto", height: "100vh" }}
        >
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
            />
          </div>
          <List
            bordered={false}
            itemLayout="vertical"
            size="large"
            dataSource={bookList}
            renderItem={(book) => (
              <div
                onClick={() => setSelectedBook(book)}
                className="hover-effect"
              >
                <Tooltip title="Delete">
                  {/*// TODO: Make the button scale up with larger screens */}
                  <Button
                    style={{
                      float: "right",
                    }}
                    type="text"
                    danger
                    onClick={() => handleDeleteButton(book)}
                    icon={<DeleteOutlined />}
                  />
                </Tooltip>
                <ListItem book={book} />
              </div>
            )}
          />
        </Sider>
        <Layout>
          <Header className="site-layout-sub-header-background">
            <AutoComplete
              size="middle"
              style={{
                display: "flex",
                float: "right",
                margin: "2vh",
                width: "25%",
              }}
              filterOption={(inputValue, option) =>
                option!.value
                  .toUpperCase()
                  .indexOf(inputValue.toUpperCase()) !== -1
              }
              onChange={(e) => setInputValue(e)}
              value={inputValue}
              placeholder="Add new book..."
              allowClear={true}
              onClear={clearState}
              onSelect={(value, option) =>
                handleAutocompleteSelect(value, option)
              }
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
          </Header>
          <BookDisplay book={selectedBook} />
        </Layout>
      </Layout>
    </>
  );
};

export default App;
