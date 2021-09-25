import { FC } from "react";
import Item, { Meta } from "antd/lib/list/Item";
import { Image, Rate } from "antd";
import { IBook } from "../models/BookListModel";

interface IBookProps {
  book: IBook;
}

const ListItem: FC<IBookProps> = ({ book }) => {
  return (
    <>
      <Item key={book.id} style={{ color: "white", padding: "2vh" }}>
        <Meta
          avatar={
            <Image
              height={"20vh"}
              width={"15vh"}
              src={
                book.img_url !== null
                  ? book.img_url
                  : "https://d3lq8p6p6r1qxf.cloudfront.net/1579208503064.png"
              }
            />
          }
          title={
            <span style={{ color: "white", fontSize: "1.2vw" }}>
              {book.title}
            </span>
          }
          description={
            <div>
              <div
                style={{
                  color: "InactiveCaptionText",
                  fontSize: "1vw",
                  display: "block",
                }}
              >
                {book.author}
              </div>
              <span>
                <Rate allowHalf value={book.rating} />
              </span>
            </div>
          }
        />
      </Item>
    </>
  );
};

export default ListItem;
