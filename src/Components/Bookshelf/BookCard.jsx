import React from "react";

import { Link } from "react-router-dom";
import { Card, Col } from "react-bootstrap";

import ACTIONS from "../../constants/actionTypes";
import { createAuthorString } from "../../utilities";
import { useBookshelfContext } from "../../hooks";

const BookCard = ({ book }) => {
  // console.log(book);
  const { dispatch } = useBookshelfContext();

  if (!book) return;

  const image = book.imageLinks?.thumbnail;
  const title = book.title;
  const subtitle = book.subtitle;
  const authors = book.authors;

  const handleClick = (book) => {
     dispatch({ type: ACTIONS.SET_BOOK_DETAILS, payload: book });
  };

  return (
    <Col xs={12} sm={6} md={4} lg={3} className="p-1">
      <Card
        onClick={() => handleClick(book)}
        style={{ cursor: "pointer" }}
        as={Link}
        to="details"
      >
        <Card.Img variant="top" src={image} alt={`${title} cover`} />
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          {subtitle && <Card.Title>{subtitle}</Card.Title>}
          <Card.Text>By: {createAuthorString(authors)}</Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default BookCard;
