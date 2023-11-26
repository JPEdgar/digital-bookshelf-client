import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

import { cropString } from "../../utilities";
import { useBookshelf } from "../../hooks";

const FriendsBook = ({ book }) => {
  const { setBookFocus } = useBookshelf();

  const bookCover = book.coversList?.large
    ? book.coversList.large
    : book.coversList?.medium
    ? book.coversList.medium
    : book.coversList?.small;

  return (
    <Card
      style={{ maxWidth: "10rem" }}
      onClick={() => setBookFocus(book)}
      as={Link}
      to="/book-details"
    >
      <Card.Img variant="top" src={bookCover} />
      <Card.Body>
        <Card.Title>{book.title}</Card.Title>
        {book.subtitle && <Card.Title>{book.subtitle}</Card.Title>}
        <Card.Text>{cropString(book.snippet, 100)}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default FriendsBook;
