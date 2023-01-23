import React from "react";

import { Row, Col, Image } from "react-bootstrap";

import OtherWorks from "./OtherWorks";
import FavoritesIcon from "../elements/FavoritesIcon";
import WishListIcon from "../elements/WishListIcon";
import ToReadListIcon from "../elements/ToReadListIcon";
import HaveReadIcon from "../elements/HaveReadIcon";
import TrashIcon from "../elements/TrashIcon";

import SEARCH_TYPE from "../../constants/types/searchTypes";
import {
  createISBNObject,
  createAuthorString,
  getFromShelf,
} from "../../utilities";
import { useBookshelfContext, useAuthContext } from "../../hooks";

const BookDetails = () => {
  const { bookshelfState } = useBookshelfContext();
  const { bookDetail, bookshelf } = bookshelfState;
  const { userState } = useAuthContext();
  const { user } = userState;

  let bookObj = getFromShelf(
    bookshelf,
    SEARCH_TYPE.BOOKSHELF_ID,
    bookDetail?.bookshelfID
  );
  if (!bookObj) {
    bookObj = bookDetail;
  }

  // console.log("BookDetails > bookObj = ", bookObj)
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
                  {user && (
                    <FavoritesIcon
                      bookshelfID={bookObj.bookshelfID}
                      bookData={bookObj}
                    />
                  )}
                  {user && (
                    <WishListIcon
                      bookshelfID={bookObj.bookshelfID}
                      bookData={bookObj}
                    />
                  )}
                  {user && (
                    <ToReadListIcon
                      bookshelfID={bookObj.bookshelfID}
                      bookData={bookObj}
                    />
                  )}
                  {user && (
                    <HaveReadIcon
                      bookshelfID={bookObj.bookshelfID}
                      bookData={bookObj}
                    />
                  )}
                  {bookObj.inBookshelfFlag && (
                    <TrashIcon bookshelfID={bookObj.bookshelfID} />
                  )}
                </div>
              </div>

              <Authors authors={bookDetail.authors} />
              <Rating
                averageRating={bookDetail.averageRating}
                ratingsCount={bookDetail.ratingsCount}
              />
              <ReleaseDate publishedDate={bookDetail.publishedDate} />
              <PageCount pageCount={bookDetail.pageCount} />
              <ISBN
                isbnObj={bookDetail?.industryIdentifiers}
                inBookshelfFlag={bookDetail?.inBookshelfFlag}
                isbn10={bookDetail?.isbn10}
                isbn13={bookDetail?.isbn13}
              />
            </Col>
          </>
        )}
      </Row>
      <Row>{bookDetail?.description}</Row>
      {/* <OtherWorks /> */}
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

const ISBN = ({ isbnObj, inBookshelfFlag, isbn10, isbn13 }) => {
  if (inBookshelfFlag) {
    return (
      <>
        {isbn10 && <div>ISBN-10: {isbn10}</div>}
        {isbn13 && <div>ISBN-13: {isbn13}</div>}
      </>
    );
  } else {
    const newISBNObj = createISBNObject(isbnObj);
    return (
      <>
        {newISBNObj.ISBN_10 && <div>ISBN-10: {newISBNObj.ISBN_10}</div>}
        {newISBNObj.ISBN_13 && <div>ISBN-13: {newISBNObj.ISBN_13}</div>}
      </>
    );
  }
};

export default BookDetails;
