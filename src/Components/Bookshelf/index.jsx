import React from "react";

import { Row } from "react-bootstrap";

import BookCard from "./BookCard";

import { useBookshelfContext } from "../../hooks";

const Bookshelf = () => {
  const { state } = useBookshelfContext();
  const { bookshelf } = state;

  return (
    <>
      <Row>{bookshelf && <BookList bookshelf={bookshelf} />}</Row>
    </>
  );
};

const BookList = ({ bookshelf = [] }) => {
  return (
    <>
      {bookshelf.map((book, index) => {
        return <BookCard book={book} key={`bookshelfListItem-${index}`} />;
      })}
    </>
  );
};

export default Bookshelf;
