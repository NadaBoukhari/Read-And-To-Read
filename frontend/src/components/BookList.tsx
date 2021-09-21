import React, { FC, useState, useEffect } from "react";
import { List, Image, Rate, AutoComplete } from "antd";
import Item, { Meta } from "antd/lib/list/Item";
import { IBook } from "../App";

const BookList: FC /*<IBook[]>*/ = (books) => {
  const [bookList, setBooklist] = useState<IBook[]>([]);

  const onSelect = (value: string) => {
    var temp = bookList;
    setBooklist(temp.filter((book) => book.title === value));
  };

  return (
    <>
      {" "}
      <AutoComplete
        style={{
          width: "80%",
          marginTop: "1vh",
          justifyContent: "center",
          display: "flex",
        }}
        options={bookList.map((book) => ({
          value: book.title,
        }))}
        placeholder="Enter book name.."
        filterOption={(inputValue, option) =>
          option!.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
        }
        allowClear={true}
        onSelect={(value) => onSelect(value)}
        onClear={() => {
          setBooklist(bookList);
        }}
      />
      <List
        bordered={false}
        itemLayout="vertical"
        size="large"
        dataSource={bookList}
        renderItem={(book) => (
          <Item key={book.id} style={{ color: "white", padding: "2vh" }}>
            <Meta
              avatar={<Image height={"20vh"} src={book.img_url} />}
              title={
                <a style={{ color: "white", fontSize: "1.2vw" }}>
                  {book.title}
                </a>
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
        )}
      />
    </>
  );
};

export default BookList;
