import React from "react";

import { Card, Stack, Image, Row, Col } from "react-bootstrap";

import { useBookshelf } from "../../hooks";

const Details = () => {
  const { bookshelf } = useBookshelf();
  const { bookFocus } = bookshelf || null;
  console.log(bookFocus);

  const coverImage = bookFocus?.coversList.large
    ? bookFocus.coversList.large
    : bookFocus?.coversList.medium
    ? bookFocus.coversList.medium
    : null;

  return (
    bookFocus && (
      <>
        <Stack direction="horizontal" gap={3}>
          <Image src={coverImage} alt={`${bookFocus.title} cover`} thumbnail />
          <Row >
            {bookFocus.title && <h4>{bookFocus.title}</h4>}
            {bookFocus.subtitle && <h5>{bookFocus.subtitle}</h5>}
            {bookFocus.authorString && <div>By: {bookFocus.authorString}</div>}
            {bookFocus.publisher && <div>Publisher: {bookFocus.publisher}</div>}
            {bookFocus.publishDate && ( <div>Published: {bookFocus.publishDate}</div> )}
            {bookFocus.pageCoun && <div>{bookFocus.pageCount} pages</div>}
            {bookFocus.categoriesString && ( <div>Genre: {bookFocus.categoriesString}</div> )}
            <Row >
              {bookFocus.isbn.isbn10 && ( <Col xs={12} md={6}> ISBN-10: {bookFocus.isbn.isbn10} </Col> )}
              {bookFocus.isbn.isbn13 && ( <Col xs={12} md={6}> ISBN-13: {bookFocus.isbn.isbn13} </Col> )}
            </Row>
          </Row>
        </Stack>
        <div>{bookFocus.snippet}</div>
      </>
    )
  );
};

export default Details;
