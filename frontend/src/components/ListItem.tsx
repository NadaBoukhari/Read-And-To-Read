import { FC } from "react";
import Item, { Meta } from "antd/lib/list/Item";
import { Image, Rate } from "antd";
import { IBook } from "../models/BookModel";

interface IBookProps {
  book: IBook;
  textColor?: string;
  setSelectedBook: (book: IBook) => void;
}

const ListItem: FC<IBookProps> = ({ book, textColor, setSelectedBook }) => {
  return (
    <>
      <Item
        key={book.id}
        style={{
          color: textColor ? textColor : "white",
          padding: "1vh",
          display: "block",
        }}
        onClick={() => setSelectedBook(book)}
      >
        <Meta
          style={{ marginBottom: 0 }}
          avatar={
            <Image
              height={"15vh"}
              width={"10vh"}
              src={
                book.img_url !== null
                  ? book.img_url
                  : "https://d3lq8p6p6r1qxf.cloudfront.net/1579208503064.png"
              }
            />
          }
          title={
            <span
              style={{
                color: textColor ? textColor : "white",
                fontSize: "1.1vw",
              }}
            >
              {book.title}
            </span>
          }
          description={
            <div>
              <div
                style={{
                  color: "ActiveCaption",
                  fontSize: "1vw",
                  display: "block",
                }}
              >
                {book.author}
              </div>
              <span>
                {book.rating !== null ? (
                  <Rate
                    disabled
                    allowHalf
                    value={book.rating}
                    style={{ fontSize: "1vw" }}
                  />
                ) : (
                  <p
                    style={{
                      color: "InactiveCaptionText",
                      fontSize: "0.9vw",
                      display: "block",
                      fontStyle: "italic",
                    }}
                  >
                    Not rated yet
                  </p>
                )}
              </span>
            </div>
          }
        />
      </Item>
    </>
  );
};

export default ListItem;
