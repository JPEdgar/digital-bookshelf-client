import React from "react";

import { Row } from "react-bootstrap";

import BookCard from "./BookCard";

import { useBookshelfContext } from "../../hooks";

const Bookshelf = () => {
  const { bookshelfState } = useBookshelfContext();
  const { bookshelf } = bookshelfState;

  return (
    <>
      <Row>{bookshelf && <BookList bookshelf={bookshelf} />}</Row>
      <hr />
      <h1>Bug: Search details and book details delete</h1>
      <h3> There is a bug where the search dropdown icons don't work with the delete buttons in Book Detail. </h3>
      <p> Only happens when an icon is clicked <i>before</i> book details are clicked/loaded </p>
      <p>No problems with home page</p>
      <p> Going from search {">"} click an icon {">"} home page {">"} search bar {">"} click on book for details {">"} delete results in same bug </p>
      <p>Could there be some bad data being passed to the book creation?</p>
      <hr />
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
