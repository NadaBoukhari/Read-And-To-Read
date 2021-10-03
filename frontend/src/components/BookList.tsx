import { FC } from "react";
import { Button, List, Popconfirm, Tooltip, message, Empty } from "antd";
import ListItem from "./ListItem";
import { DeleteOutlined } from "@ant-design/icons";
import { IBook } from "../models/BookModel";
import ApiCalls from "../api/ApiCalls";
import { useDispatch } from "react-redux";
import { deleteBook } from "../store/slices/BookListSlices";

interface IBookListProps {
  bookList: IBook[];
}

const BookList: FC<IBookListProps> = ({ bookList }) => {
  const dispatch = useDispatch();

  const handleDeleteButton = (bookToDelete: IBook) => {
    ApiCalls.deleteBook(bookToDelete.id)
      .then(() => {
        dispatch(deleteBook(bookToDelete.id));
        message.success(
          `Successfully removed ${bookToDelete.title} from reading list.`,
          1.5
        );
      })
      .catch((err) => message.error(err.message));
  };

  return (
    <>
      {bookList.length === 0 ? (
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
              <ListItem book={book} />
            </div>
          )}
        />
      )}
    </>
  );
};

export default BookList;
