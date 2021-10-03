import { AutoComplete, Drawer } from "antd";
import { FC, useState, useEffect } from "react";
import { IBook } from "../models/BookModel";
import { useDispatch, useSelector } from "react-redux";
import { toggleVisible, setSelectedBook } from "../store/slices/BookListSlices";
import { RootState } from "../store";
import BookList from "./BookList";

const BookListDrawer: FC = () => {
  const dispatch = useDispatch();
  const globalBookList = useSelector(
    (state: RootState) => state.bookList.bookList
  );
  const globalVisible = useSelector(
    (state: RootState) => state.bookList.visible
  );
  const [bookList, setBookList] = useState<IBook[]>(globalBookList);
  const [input, setInput] = useState<string>("");

  useEffect(() => {
    setBookList(globalBookList);
  }, [globalBookList]);

  const updateInput = async (input: string) => {
    const filtered = globalBookList.filter((book) => {
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
    dispatch(setSelectedBook(newBook));
  };

  const onClose = () => {
    dispatch(toggleVisible(false));
  };

  return (
    <>
      <Drawer
        title="Your Book List"
        placement="right"
        onClose={onClose}
        visible={globalVisible}
        width={"20vw"}
        style={{ overflow: "auto", height: "100vh" }}
      >
        <div style={{ display: "flex", justifyContent: "center" }}>
          <AutoComplete
            style={{
              width: "80%",
              marginTop: "1vh",
            }}
            options={bookList.map((book) => ({
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
        <BookList bookList={bookList} />
      </Drawer>
    </>
  );
};

export default BookListDrawer;
