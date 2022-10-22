import React from "react";

import { Link } from "react-router-dom";
import { Card, Col } from "react-bootstrap";

import BOOKSHELF_TYPES from "../../constants/bookshelfTypes";
import { createAuthorString } from "../../utilities";
import { useBookshelfContext, useAuthContext } from "../../hooks";
import FavoritesIcon from "../elements/FavoritesIcon";
import TrashIcon from "../elements/TrashIcon";
import WishListIcon from "../elements/WishListIcon";
import ToReadListIcon from "../elements/ToReadListIcon";
import HaveReadIcon from "../elements/HaveReadIcon";

const BookCard = ({ book }) => {
  const { dispatch } = useBookshelfContext();
  const { userState } = useAuthContext();
  const { user } = userState;

  if (!book) return;

  const image = book.imageLinks?.thumbnail;
  const title = book.title;
  const subtitle = book.subtitle;
  const authors = book.authors;
  const inBookshelfFlag = book.inBookshelfFlag

  const handleClick = (book) => {
    dispatch({ type: BOOKSHELF_TYPES.SET_BOOK_DETAILS, payload: book });
  };

  return (
    <Col xs={12} sm={6} md={4} lg={3} className="p-1">
      <Card style={{ cursor: "pointer" }}>
        <Link to="details">
          <Card.Img
            variant="top"
            src={image}
            alt={`${title} cover`}
            onClick={() => handleClick(book)}
          />
        </Link>

        <Card.Body>
          <div className="d-flex justify-content-between">
            {user && ( <FavoritesIcon bookshelfID={book.bookshelfID} bookData={book} /> )}
            {user && ( <WishListIcon bookshelfID={book.bookshelfID} bookData={book} /> )}
            {user && ( <ToReadListIcon bookshelfID={book.bookshelfID} bookData={book} /> )}
            {user && ( <HaveReadIcon bookshelfID={book.bookshelfID} bookData={book} /> )}
            {inBookshelfFlag && ( <TrashIcon bookshelfID={book.bookshelfID} /> )}
          </div>
          <Link to="details" onClick={() => handleClick(book)}>
            <Card.Title>{title}</Card.Title>
            {subtitle && <Card.Title>{subtitle}</Card.Title>}
            <Card.Text>By: {createAuthorString(authors)}</Card.Text>
          </Link>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default BookCard;
