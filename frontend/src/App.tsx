import "antd/dist/antd.css";
import "./App.css";
import { FC, useEffect, useState } from "react";
import { Layout } from "antd";
import { IBook } from "./models/BookModel";
import BookDisplay from "./components/BookDisplay";
import AddNewBook from "./components/AddNewBook";
import { useDispatch, useSelector } from "react-redux";
import { getBookList, toggleVisible } from "./store/slices/BookListSlices";
import BookListSider from "./components/BookListSider";
import { BsArrowBarLeft } from "react-icons/bs";
import ApiCalls from "./api/ApiCalls";
import { RootState } from "./store";

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

  const globalVisible = useSelector(
    (state: RootState) => state.booklist.visible
  );

  useEffect(() => {
    try {
      ApiCalls.getAllBooks().then((response) => {
        dispatch(getBookList(response.data));
      });
    } catch (err: any) {
      console.log(err.message);
    }
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
            <BsArrowBarLeft
              style={{
                display: "flex",
                float: "right",
                width: "1.5vw",
                height: "100%",
                marginRight: "1vh",
              }}
              onClick={() => dispatch(toggleVisible(!globalVisible))}
            />
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
