import "antd/dist/antd.css";
import "./App.css";
import { FC, useEffect, useState } from "react";
import { Layout } from "antd";
import { IBook } from "./models/BookModel";
import BookDisplay from "./components/BookDisplay";
import ApiCalls from "./api/ApiCalls";
import AddNewBook from "./components/AddNewBook";
import BookList from "./components/BookList";
import SearchBookAutocomplete from "./components/SearchBookAutocomplete";

const { Header, Sider } = Layout;

export interface IBookProps {
  bookList: IBook[];
}

// TODO: Add loading functionalities to async operations
// TODO: Check react passing state to child as props

const App: FC = () => {
  const [bookList, setBookList] = useState<IBook[]>([]);
  const [bookListDefault, setBookListDefault] = useState<IBook[]>([]);
  const [selectedBook, setSelectedBook] = useState<IBook>({
    id: "",
    title: "",
    author: "",
  });

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
          <SearchBookAutocomplete
            bookList={bookList}
            setBookList={setBookList}
            setSelectedBook={setSelectedBook}
            bookListDefault={bookListDefault}
          />
          <BookList
            bookList={bookList}
            setSelectedBook={setSelectedBook}
            setBookList={setBookList}
          />
        </Sider>
        <Layout>
          <Header className="site-layout-sub-header-background">
            <AddNewBook bookList={bookList} setBookList={setBookList} />
          </Header>
          <BookDisplay book={selectedBook} />
        </Layout>
      </Layout>
    </>
  );
};

export default App;
