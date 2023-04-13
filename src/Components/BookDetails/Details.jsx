import React from "react";

import { Card, Stack, Image } from "react-bootstrap";

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
          <div>
            {bookFocus.title && <div>{bookFocus.title}</div>}
            {bookFocus.subtitle && <div>{bookFocus.subtitle}</div>}
            {bookFocus.authorString && <div>By: {bookFocus.authorString}</div>}
            {bookFocus.publisher && <div>Publisher: {bookFocus.publisher}</div>}
            {bookFocus.publishDate && (
              <div>Published: {bookFocus.publishDate}</div>
            )}
            {bookFocus.pageCoun && <div>{bookFocus.pageCount} pages</div>}
            {bookFocus.categoriesString && (
              <div>Genre: {bookFocus.categoriesString}</div>
            )}
            {bookFocus.isbn.isbn10 && (
              <div>ISBN-10: {bookFocus.isbn.isbn10}</div>
            )}
            {bookFocus.isbn.isbn13 && (
              <div>ISBN-13: {bookFocus.isbn.isbn13}</div>
            )}
          </div>
        </Stack>
        <div>{bookFocus.snippet}</div>
      </>
    )
  );
};

export default Details;
