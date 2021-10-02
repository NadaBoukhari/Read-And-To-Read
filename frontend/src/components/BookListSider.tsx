import {
  AutoComplete,
  Button,
  Empty,
  List,
  Popconfirm,
  Tooltip,
  message,
} from "antd";
import Sider from "antd/lib/layout/Sider";
import { FC, useState, useEffect } from "react";
import { IBook } from "../models/BookModel";
import { DeleteOutlined } from "@ant-design/icons";
import ListItem from "./ListItem";
import ApiCalls from "../api/ApiCalls";
import { useDispatch, useSelector } from "react-redux";
import { deleteBook } from "../store/actions/bookListActions";
import { RootState } from "../store";

interface ISearchBookAutocompleteProps {
  setSelectedBook: (book: IBook) => void;
}

const BookListSider: FC<ISearchBookAutocompleteProps> = ({
  setSelectedBook,
}) => {
  const dispatch = useDispatch();
  const globalBookList = useSelector((state: RootState) => state.bookList);
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const [booklist, setBookList] = useState<IBook[]>(
    globalBookList.data.bookList
  );
  const [input, setInput] = useState<string>("");

  useEffect(() => {
    setBookList(globalBookList.data.bookList);
  }, [globalBookList.data.bookList]);

  const onCollapse = (collapsed: boolean) => {
    setCollapsed(collapsed);
  };

  const toggle = () => {
    setCollapsed(!collapsed);
  };

  const updateInput = async (input: string) => {
    const filtered = globalBookList.data.bookList.filter((book) => {
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
      .then(() => {
        dispatch(deleteBook(bookToDelete.id));
        const newBooklist = booklist.filter((book) => {
          return book.id !== bookToDelete.id;
        });
        setBookList(newBooklist);
        message.success(
          `Successfully removed ${bookToDelete.title} from reading list.`,
          1.5
        );
      })
      .catch((err) => message.error(err.message));
  };
  return (
    <>
      <Button onClick={() => toggle()}>Hey</Button>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        onCollapse={onCollapse}
        collapsedWidth="3vw"
        breakpoint="xs"
        width={"18vw"}
        style={{ overflow: "auto", height: "100vh" }}
      >
        {collapsed ? (
          <div
            className="hover-effect"
            onClick={toggle}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
              overflow: "hidden",
            }}
          >
            <h1
              style={{
                color: "white",
                writingMode: "vertical-rl",
                fontSize: "2vw",
                margin: 0,
              }}
            >
              Book List
            </h1>
          </div>
        ) : (
          <>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <AutoComplete
                style={{
                  width: "80%",
                  marginTop: "1vh",
                }}
                options={booklist.map((book) => ({
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

            {booklist.length === 0 ? (
              <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description={
                  <span style={{ color: "white", fontStyle: "italic" }}>
                    The book list is empty for now... Try adding a new book !
                  </span>
                }
              />
            ) : (
              <List
                bordered={false}
                itemLayout="vertical"
                size="large"
                dataSource={booklist}
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
            )}
          </>
        )}
      </Sider>
    </>
  );
};

export default BookListSider;
