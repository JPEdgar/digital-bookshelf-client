import React from "react";

import { Link } from "react-router-dom";
import { Card, Col } from "react-bootstrap";

import { createAuthorString } from "../../utilities";
import useBookshelfContext from "../../hooks/useBookshelfContext";

const BookCard = ({ book }) => {
  const { setBookDetail } = useBookshelfContext();

  if (!book) return;

  const image = book.volumeInfo.imageLinks?.thumbnail;
  const title = book.volumeInfo.title;
  const subtitle = book.volumeInfo?.subtitle;
  const authors = book.volumeInfo.authors;

  const handleClick = () => {
    setBookDetail(book.volumeInfo);
  };

  return (
    <Col xs={12} sm={6} md={4} lg={3} className="p-1">
      <Card
        onClick={() => handleClick()}
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
