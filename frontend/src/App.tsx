import "antd/dist/antd.css";
import "./App.css";
import { FC, useEffect } from "react";
import { Layout } from "antd";
import { IBook } from "./models/BookModel";
import BookDisplay from "./components/BookDisplay";
import AddNewBook from "./components/AddNewBook";
import { useDispatch, useSelector } from "react-redux";
import { getBookList, toggleVisible } from "./store/slices/BookListSlices";
import BookListDrawer from "./components/BookListDrawer";
import { BsArrowBarLeft } from "react-icons/bs";
import ApiCalls from "./api/ApiCalls";
import { RootState } from "./store";

const { Header, Sider } = Layout;

export interface IBookProps {
  bookList: IBook[];
}

// TODO: Add loading functionalities to async operations
// TODO: Move the delete button to the book display

const App: FC = () => {
  const dispatch = useDispatch();

  const globalVisible = useSelector(
    (state: RootState) => state.bookList.visible
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
          <BookDisplay />
        </Layout>
        <BookListDrawer />
      </Layout>
    </>
  );
};

export default App;
