import { FC } from "react";
import { Button, List, Popconfirm, Tooltip, message, Empty } from "antd";
import ListItem from "./ListItem";
import { DeleteOutlined } from "@ant-design/icons";
import { IBook } from "../models/BookModel";
import ApiCalls from "../api/ApiCalls";

// TODO: Remove IBookProps from listItem and remove textcolor property
interface IBookListProps {
  bookList: IBook[];
  setBookList: (bookList: IBook[]) => void;
  textColor?: string;
  setSelectedBook: (book: IBook) => void;
}

const BookList: FC<IBookListProps> = ({
  bookList,
  setSelectedBook,
  setBookList,
}) => {
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

  return (
    <>
      {bookList.length === 0 ? (
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description={
            <span style={{ color: "white" }}>
              Sorry ! No books are available
            </span>
          }
        />
      ) : (
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
      )}
    </>
  );
};

export default BookList;
