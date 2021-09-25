import { FC } from "react";
import { Layout, Image, Rate } from "antd";
import { IBookDisplayProp } from "../App";
const { Content } = Layout;

const BookDisplay: FC<IBookDisplayProp> = ({ book }) => {
  return (
    <>
      <Content className="site-layout-content">
        <div className="site-layout-background">
          <div>{book?.title}</div>
          <div>{book?.author}</div>
          <Rate allowHalf value={book?.rating} />
          <div>{book?.review}</div>
          <Image src={book?.img_url} />
          <div>{book?.id}</div>
        </div>
      </Content>{" "}
    </>
  );
};

export default BookDisplay;
