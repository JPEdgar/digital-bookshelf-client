import React from "react";

import { createISBNObject } from "../../utilities";

import { Row, Col, Image } from "react-bootstrap";
import { useBookshelfContext } from "../../Context/Bookshelf/BookshelfContext";

const BookDetails = () => {
  const { bookDetail } = useBookshelfContext();

  return (
    <>
      <Row>
        {bookDetail && (
          <>
            <Col xs={3} className="d-flex justify-content-center">
              <Image
                src={bookDetail.imageLinks?.thumbnail}
                alt={`${bookDetail.title} cover`}
              />
            </Col>
            <Col xs={9}>
              <div>{bookDetail.title}</div>
              <div>{bookDetail.subtitle}</div>
              <Authors authors={bookDetail.authors} />
              <Rating
                averageRating={bookDetail.averageRating}
                ratingsCount={bookDetail.ratingsCount}
              />
              <ReleaseDate publishedDate={bookDetail.publishedDate} />
              <PageCount pageCount={bookDetail.pageCount} />
              <ISBN isbnObj={bookDetail.industryIdentifiers} />
            </Col>
          </>
        )}
      </Row>
      <Row>{bookDetail?.description}</Row>
      <Row>Other works...</Row>
    </>
  );
};

const Authors = ({ authors }) => {
  return (
    <div>
      by:
      <span className="m-1">
        {authors?.map((author, index) => (
          <Author
            key={`author-${index}`}
            author={author}
            index={index}
            length={authors.length}
          />
        ))}
      </span>
    </div>
  );
};

const Author = ({ author, index, length }) => {
  let returnValue = "";

  if (index === 0) returnValue = author;
  else if (index + 1 === length) returnValue = `, and ${author}`;
  else if (index > 0 && index + 1 !== length) returnValue = `, ${author}`;

  return <span>{returnValue}</span>;
};

const Rating = ({ averageRating, ratingsCount }) => {
  return averageRating ? (
    <div>
      Rating: {averageRating}
      <span className="m-1">
        ({ratingsCount}
        {ratingsCount > 0 ? " reviews" : " reviewer"})
      </span>
    </div>
  ) : (
    <div>No reviews</div>
  );
};

const ReleaseDate = ({ publishedDate }) => {
  return <div>Released: {publishedDate}</div>;
};

const PageCount = ({ pageCount }) => {
  return <div>{pageCount} pages</div>;
};

const ISBN = ({ isbnObj }) => {
  const newISBNObj = createISBNObject(isbnObj);
  return (
    <>
      {newISBNObj.ISBN_10 && <div>ISBN-10: {newISBNObj.ISBN_10}</div>}
      {newISBNObj.ISBN_13 && <div>ISBN-13: {newISBNObj.ISBN_13}</div>}
    </>
  );
};

export default BookDetails;
