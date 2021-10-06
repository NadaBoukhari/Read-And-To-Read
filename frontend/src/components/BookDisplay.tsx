import { FC, useEffect, useState } from "react";
import { Layout, Image, Rate, Row, Col } from "antd";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import Vibrant from "node-vibrant";

const { Content } = Layout;

const BookDisplay: FC = () => {
  const [back, setBack] = useState<string | undefined>("white");
  const book = useSelector((state: RootState) => state.displayBook.displayBook);
  useEffect(() => {
    if (book.img_url) {
      new Vibrant(book.img_url)
        .getPalette()
        .then((palette) => setBack(palette.LightVibrant?.hex));
    }
  }, [book.img_url]);
  return (
    <>
      <Content style={{ margin: "0vh 1vh 1vh 1vh" }}>
        <div
          style={{
            padding: "1vh",
            height: "89vh",
            background: "white",
          }}
        >
          <Row gutter={[8, 8]}>
            <div
              style={{
                height: "30vh",
                width: "25vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 25,
                background: back,
                boxShadow:
                  "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px",
              }}
            >
              <Image
                preview={false}
                src={book.img_url}
                style={{
                  borderRadius: 25,
                  boxShadow:
                    "rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px",
                }}
                width="70%"
              />
            </div>
            <Col span={6}>
              <div style={{ fontWeight: 700, fontSize: "1.5vw" }}>
                {book.title}
              </div>
              <div
                style={{
                  fontStyle: "italic",
                  fontSize: "1.1vw",
                  color: "GrayText",
                }}
              >
                {book.author}
              </div>
              <Rate
                allowHalf
                value={book.rating}
                style={{ fontSize: "0.8em" }}
              />
            </Col>
            <Col>
              <div>{book.description}</div>
              <br />
              <div>{book.review}</div>
            </Col>
          </Row>
        </div>
      </Content>
    </>
  );
};

export default BookDisplay;
