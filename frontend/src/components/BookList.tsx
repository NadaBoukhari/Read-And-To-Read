import { FC } from "react";
import { List } from "antd";
import ListItem from "./ListItem";
import { IBookProps } from "../App";

const BookList: FC<IBookProps> = ({ bookList }) => {
  return (
    <>
      <List
        bordered={false}
        itemLayout="vertical"
        size="large"
        dataSource={bookList}
        renderItem={(book) => <ListItem book={book} />}
      />
    </>
  );
};

export default BookList;
