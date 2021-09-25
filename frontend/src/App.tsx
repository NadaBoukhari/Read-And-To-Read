import "antd/dist/antd.css";
import "./App.css";
import { FC, useEffect, useState } from "react";
import ListItem from "./components/ListItem";
import { Layout, AutoComplete, List, Input } from "antd";
import axios from "axios";
import { IBook } from "./models/BookListModel";
import BookDisplay from "./components/BookDisplay";
import AddNewBook from "./components/AddNewBook";
const { Header, Content, Sider } = Layout;

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
                <ListItem book={book} />
              </div>
            )}
          />
        </Sider>
        <Layout>
          <Header className="site-layout-sub-header-background">
            <AddNewBook />
          </Header>
          <BookDisplay book={selectedBook} />
        </Layout>
      </Layout>
    </>
  );
};

export default App;
