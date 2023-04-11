import React from "react";

import { Card, Button, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";

const BookshelfItem = ({ content }) => {
  console.log(content);
  return (
    <>
      <Card
        style={{ width: "36rem", cursor: "pointer" }}
        className="my-2"
        as={Link}
        to="/books"
      >
        <Stack direction="horizontal">
          <Card.Img
            variant="top"
            src={"https://picsum.photos/200/300"}
            style={{ height: "15rem", objectFit: "cover" }}
          />
          <Card.Body
            className="d-flex flex-column "
            style={{ height: "15rem" }}
          >
            <Card.Title>{content.title}</Card.Title>
            <Card.Text className="mb-2">
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </Card.Text>
            <Card.Text className="mb-2">ISBN</Card.Text>
            <Card.Text className="mb-2">Ect...</Card.Text>
          </Card.Body>
        </Stack>
      </Card>
    </>
  );
};

export default BookshelfItem;
