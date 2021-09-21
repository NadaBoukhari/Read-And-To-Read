import { FC, useEffect } from "react";
import "antd/dist/antd.css";
import "./App.css";
import { Layout } from "antd";
import BookList from "./components/BookList";
import axios from "axios";

export interface IBook {
  id: string;
  title: string;
  author: string;
  review: string;
  rating: number;
  img_url: string;
}

const { Header, Content, Sider } = Layout;

const App: FC = () => {
  let savedBooks: IBook[] = [];

  useEffect(() => {
    axios
      .get<IBook[]>("http://localhost:8080/books/all", {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        savedBooks = response.data;
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  return (
    <>
      <Layout>
        <Sider
          breakpoint="xs"
          collapsedWidth="0"
          width={"45vh"}
          style={{ overflow: "auto", height: "100vh" }}
        >
          <BookList /*books={savedBooks}*/ />
        </Sider>
        <Layout>
          <Header className="site-layout-sub-header-background" />
          <Content className="site-layout-content">
            <div className="site-layout-background">content bla bla</div>
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export default App;
