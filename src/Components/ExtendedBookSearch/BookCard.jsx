import React, { useState } from "react";
import { Card, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

import { useBookshelf } from "../../hooks";

const BookCard = ({ bookData }) => {
  const { setBookFocus } = useBookshelf();
  const [mouseover, setMouseover] = useState(false);

  const bookCover = bookData.coversList.large
    ? bookData.coversList.large
    : bookData.coversList.medium
    ? bookData.coversList.medium
    : bookData.coversList.small;

  const handleClick = (bookData) => {
    setBookFocus(bookData);
  };

  const style = {
    cursor: "pointer",
    backgroundColor: mouseover ? "cyan" : "",
    width: "14rem",
  };

  return (
    <Col className="mb-2">
      <Card
        as={Link}
        to="/book-details"
        className="h-100"
        style={style}
        onClick={() => handleClick(bookData)}
        onMouseEnter={() => setMouseover(true)}
        onMouseLeave={() => setMouseover(false)}
      >
        <Card.Img variant="top" src={bookCover} />
        <Card.Body className="d-flex flex-column justify-content-between">
          <Card.Title>{bookData.title}</Card.Title>
          <Card.Text>By: {bookData.authorString}</Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default BookCard;
