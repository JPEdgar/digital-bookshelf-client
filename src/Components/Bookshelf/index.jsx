import React, { useEffect, useState } from "react";

import { Row, Col } from "react-bootstrap";

import BookCard from "./BookCard";
import { getBookDetails } from "../../utilities";
import useBookshelfContext from "../../hooks/useBookshelfContext";

const Bookshelf = () => {
  const [bookshelfList, setBookshelfList] = useState([]);
  const { bookshelf, API } = useBookshelfContext();

  useEffect(() => {
    const getBookshelfDetails = async () => {
      const tempBookshelf = [];
      for (let i = 0; i < bookshelf?.length; i++) {
        let query;
        if (bookshelf[i].inBookshelfFlag) {
          // if (bookshelf[i].id) query = bookshelf[i].id;
          // else
          if (bookshelf[i].isbn13) query = bookshelf[i].isbn13;
          else if (bookshelf[i].isbn10) query = bookshelf[i].isbn10;

          tempBookshelf.push(await getBookDetails(API, query));
        }
      }
      setBookshelfList(tempBookshelf);
    };
    getBookshelfDetails();
  }, [bookshelf]);

  return (
    <>
      <button onClick={() => console.log(bookshelfList)}>
        Log Bookshelf List
      </button>
      <Row>
        <BookList bookshelfList={bookshelfList} />
      </Row>
    </>
  );
};

const BookList = ({ bookshelfList = [] }) => {
  return (
    <>
      {bookshelfList.map((book, index) => {
        return <BookCard book={book} key={`bookshelfListItem-${index}`} />;
      })}
    </>
  );
};

export default Bookshelf;
