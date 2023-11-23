import React from "react";

import { Card, Stack, Image, Row, Col } from "react-bootstrap";

import FavoritesIcon from "../elements/FavoritesIcon";
import WishListIcon from "../elements/WishListIcon";
import WantToReadIcon from "../elements/WantToReadIcon";
import HaveReadIcon from "../elements/HaveReadIcon";
import TrashIcon from "../elements/TrashIcon";
import { useBookshelf } from "../../hooks";

const Details = () => {
  const { bookshelf, toggleFavorite, toggleOnBookshelf, isOnBookshelf } =
    useBookshelf();
  const { bookFocus } = bookshelf || null;

  const coverImage = bookFocus?.coversList.large
    ? bookFocus.coversList.large
    : bookFocus?.coversList.medium
    ? bookFocus.coversList.medium
    : null;

  const toggleOnShelf = () => {
    toggleOnBookshelf(bookFocus, true, true);
    toggleFavorite(bookFocus);
  };

  return (
    bookFocus && (
      <>
        <button onClick={() => toggleOnShelf()}>Toggle onShelf</button>
        <Stack
          direction="horizontal"
          gap={3}
          style={{ backgroundColor: "", width: "100%", height: "100%" }}
          className="align-items-start"
        >
          <Image src={coverImage} alt={`${bookFocus.title} cover`} thumbnail />
          <div style={{ backgroundColor: "" }} className="w-100 h-100">
            {bookFocus.title && <h4>{bookFocus.title}</h4>}
            {bookFocus.subtitle && <h5>{bookFocus.subtitle}</h5>}
            {bookFocus.authorString && <div>By: {bookFocus.authorString}</div>}
            {bookFocus.publisher && <div>Publisher: {bookFocus.publisher}</div>}
            {bookFocus.publishDate && (
              <div>Published: {bookFocus.publishDate}</div>
            )}
            {bookFocus.pageCoun && <div>{bookFocus.pageCount} pages</div>}
            {bookFocus.categoriesString && (
              <div>Genre: {bookFocus.categoriesString}</div>
            )}
            <Row>
              {bookFocus.isbn.isbn10 && (
                <Col xs={12} md={6}>
                  ISBN-10: {bookFocus.isbn.isbn10}
                </Col>
              )}
              {bookFocus.isbn.isbn13 && (
                <Col xs={12} md={6}>
                  ISBN-13: {bookFocus.isbn.isbn13}
                </Col>
              )}
            </Row>
          </div>
          <div className="d-flex flex-column gap-2">
            <FavoritesIcon bookData={bookFocus} />
            <WishListIcon bookData={bookFocus} />
            <WantToReadIcon bookData={bookFocus} />
            <HaveReadIcon bookData={bookFocus} />
            {isOnBookshelf(bookFocus.isbn) && (
              <TrashIcon bookData={bookFocus} />
            )}
          </div>
        </Stack>
        <div>{bookFocus.snippet}</div>
      </>
    )
  );
};

export default Details;
