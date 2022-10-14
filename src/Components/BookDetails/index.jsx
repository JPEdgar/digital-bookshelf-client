import React from "react";

import { Row, Col, Image } from "react-bootstrap";

import OtherWorks from "./OtherWorks";
import FavoritesIcon from "../elements/FavoritesIcon";
import { createISBNObject, createAuthorString } from "../../utilities";
import useBookshelfContext from "../../hooks/useBookshelfContext";

const BookDetails = () => {
  const { bookDetail, isOnBookshelf, toggleToBookshelf } =
    useBookshelfContext();

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
              <div className="d-flex justify-content-between">
                <BookTitle
                  title={bookDetail.title}
                  subtitle={bookDetail.subtitle}
                />
                <div>
                  <FavoritesIcon
                    toggle={isOnBookshelf(null, bookDetail.industryIdentifiers)}
                    onClick={() =>
                      toggleToBookshelf(bookDetail.industryIdentifiers)
                    }
                  />
                </div>
              </div>

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
      <OtherWorks />
    </>
  );
};

const BookTitle = ({ title, subtitle }) => {
  return (
    <div>
      <div>{title}</div>
      <div>{subtitle}</div>
    </div>
  );
};

const Authors = ({ authors }) => {
  return (
    <div>
      by:
      <span className="ms-1">{createAuthorString(authors)}</span>
    </div>
  );
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
