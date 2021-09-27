import "antd/dist/antd.css";
import "./App.css";
import { FC, useEffect, useState } from "react";
import ListItem from "./components/ListItem";
import {
  Layout,
  AutoComplete,
  List,
  Button,
  Tooltip,
  message,
  Popconfirm,
} from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { IBook } from "./models/BookModel";
import BookDisplay from "./components/BookDisplay";
import ApiCalls from "./api/ApiCalls";
import AddNewBook from "./components/AddNewBook";

const { Header, Sider } = Layout;

export interface IBookProps {
  bookList: IBook[];
}

export interface IBookDisplayProp {
  book: IBook | undefined;
}

// TODO: Add loading functionalities to async operations
// TODO: Check react passing state to child as props

const App: FC = () => {
  const [input, setInput] = useState<string>("");
  const [bookList, setBookList] = useState<IBook[]>([]);
  const [bookListDefault, setBookListDefault] = useState<IBook[]>([]);
  const [selectedBook, setSelectedBook] = useState<IBook>();
  const [inputValue, setInputValue] = useState<string>("");
  const [filteredSuggestions, setFilteredSuggestions] = useState<IBook[]>([]);

  useEffect(() => {
    ApiCalls.getAllBooks()
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
    ApiCalls.deleteBook(bookToDelete.id)
      .then(() =>
        message.success(
          `Successfully removed ${bookToDelete.title} from reading list.`,
          2
        )
      )
      .catch((err) => message.error(err.message));

    const newBooklist = bookList.filter((book) => {
      return book.id !== bookToDelete.id;
    });

    setBookList(newBooklist);
  };
  // TODO: Remove rating from add book confirm modal
  // TODO: Make the delete button scale up with larger screens
  // TODO: Move the delete button to the book display

  return (
    <>
      <Layout>
        <Sider
          breakpoint="xs"
          collapsedWidth="0"
          width={"22vw"}
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
              dropdownStyle={{ maxHeight: "40vh", overflow: "auto" }}
            />
          </div>
          <List
            bordered={false}
            itemLayout="vertical"
            size="large"
            dataSource={bookList}
            renderItem={(book) => (
              <div className="hover-effect">
                <Popconfirm
                  title={"Are you sure you want to delete this book ?"}
                  onConfirm={() => handleDeleteButton(book)}
                  okText="Yes"
                  cancelText="Cancel"
                >
                  <Tooltip title="Delete">
                    <Button
                      style={{
                        float: "right",
                      }}
                      type="text"
                      danger
                      icon={<DeleteOutlined />}
                    />
                  </Tooltip>
                </Popconfirm>
                <ListItem book={book} setSelectedBook={setSelectedBook} />
              </div>
            )}
          />
        </Sider>
        <Layout>
          <Header className="site-layout-sub-header-background">
            <AddNewBook
              inputValue={inputValue}
              setInputValue={setInputValue}
              filteredSuggestions={filteredSuggestions}
              setFilteredSuggestions={setFilteredSuggestions}
              bookList={bookList}
              setBookList={setBookList}
            />
          </Header>
          <BookDisplay book={selectedBook} />
        </Layout>
      </Layout>
    </>
  );
};

export default App;
