import React, { useState } from "react";

import { Card, Button, Stack, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

import FavoritesIcon from "../elements/FavoritesIcon";
import WishListIcon from "../elements/WishListIcon";
// import WantToReadIcon from "../elements/WantToReadIcon";
import HaveReadIcon from "../elements/HaveReadIcon";
import TrashIcon from "../elements/TrashIcon";
import { useBookshelf } from "../../hooks";

const BookshelfItem = ({ content }) => {
  const { setBookFocus } = useBookshelf();
  const [mouseover, setMouseover] = useState(false);

  const coverImage = content.coversList.large
    ? content.coversList.large
    : content.coversList.medium
    ? content.coversList.medium
    : content.coversList.small;

  const handleClick = () => {
    setBookFocus(content);
  };

  const style = { cursor: "pointer", backgroundColor: mouseover ? "cyan" : "" };

  return (
    <Col xs={12} md={6} lg={4} className="d-flex">
      <Card
        style={style}
        className="my-2"
        as={Link}
        to="/book-details"
        onMouseEnter={() => setMouseover(true)}
        onMouseLeave={() => setMouseover(false)}
      >
        <Stack direction="horizontal">
          <Card.Img
            variant="top"
            src={coverImage}
            style={{
              maxHeight: "15rem",
              minHeight: "10rem",
              objectFit: "contain",
            }}
            onClick={() => handleClick()}
          />

          <Card.Body
            onClick={() => handleClick()}
            className="d-flex flex-column justify-content-between w-100"
            style={{ maxHeight: "15rem", minHeight: "10rem" }}
          >
            <Card.Title>{content.title}</Card.Title>
            {content.subtitle && (
              <Card.Title className="fs-6">{content.subtitle}</Card.Title>
            )}

            {content.authorString && (
              <Card.Text className="mb-2">By: {content.authorString}</Card.Text>
            )}
          </Card.Body>
        </Stack>
      </Card>
      <div
        className="mx-1 d-flex flex-column align-items-center gap-2 my-3"
        style={{
          maxHeight: "15rem",
          minHeight: "10rem",
          position: "relative",
          top: "0",
          left: "-1.6rem",
        }}
      >
        <FavoritesIcon bookData={content} />

        <WishListIcon bookData={content} />

        {/* <WantToReadIcon bookData={content} /> */}

        <HaveReadIcon bookData={content} />

        <TrashIcon bookData={content} />
      </div>
    </Col>
  );
};

export default BookshelfItem;
