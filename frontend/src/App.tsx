import "antd/dist/antd.css";
import "./App.css";
import { FC, useEffect, useState } from "react";
import { Layout } from "antd";
import { IBook } from "./models/BookModel";
import BookDisplay from "./components/BookDisplay";
import AddNewBook from "./components/AddNewBook";
import { useDispatch } from "react-redux";
import { getBookList } from "./store/actions/bookListActions";
import BookListSider from "./components/BookListSider";

const { Header, Sider } = Layout;

export interface IBookProps {
  bookList: IBook[];
}

// TODO: Add loading functionalities to async operations

const App: FC = () => {
  const dispatch = useDispatch();
  const [selectedBook, setSelectedBook] = useState<IBook>({
    id: "",
    title: "",
    author: "",
  });

  useEffect(() => {
    dispatch(getBookList());
  }, [dispatch]);

  // TODO: Remove rating from add book confirm modal
  // TODO: Make the delete button scale up with larger screens
  // TODO: Move the delete button to the book display

  return (
    <>
      <Layout>
        <Sider
          breakpoint="xs"
          width={"15vw"}
          style={{ overflow: "auto", height: "100vh" }}
        ></Sider>
        <Layout>
          <Header className="site-layout-sub-header-background">
            <AddNewBook />
          </Header>
          <BookDisplay book={selectedBook} />
        </Layout>
        <BookListSider setSelectedBook={setSelectedBook} />
      </Layout>
    </>
  );
};

export default App;
