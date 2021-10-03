import { FC } from "react";
import { Layout, Image, Rate } from "antd";
import { useSelector } from "react-redux";
import { RootState } from "../store";
const { Content } = Layout;

const BookDisplay: FC = () => {
  const book = useSelector((state: RootState) => state.bookList.selectedBook);
  return (
    <>
      <Content className="site-layout-content">
        <div className="site-layout-background">
          <div>{book.title}</div>
          <div>{book.author}</div>
          <div>{book.img_url}</div>
          <Rate allowHalf value={book.rating} />
          <div>{book.review}</div>
          <Image src={book.img_url} />
          <div>{book.id}</div>
        </div>
      </Content>
    </>
  );
};

export default BookDisplay;
