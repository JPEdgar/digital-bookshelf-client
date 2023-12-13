import React from "react";

import { Form, InputGroup, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faGift,
  faListCheck,
  faGlasses,
  faCheckDouble,
} from "@fortawesome/free-solid-svg-icons";

import MouseoverInfo from "../elements/MouseoverInfo";

const BookshelfMenu = ({ filterBy, setFilterBy }) => {
  const handleChange = (e) => {
    setFilterBy((curr) => ({ ...curr, [e.target.name]: e.target.checked }));
  };

  const handleFilterAll = () => {
    if (
      filterBy.favorites &&
      filterBy.wishlist &&
      filterBy.wantToRead &&
      filterBy.haveRead
    ) {
      setFilterBy({
        favorites: false,
        wishlist: false,
        wantToRead: false,
        haveRead: false,
      });
    } else {
      setFilterBy({
        favorites: true,
        wishlist: true,
        wantToRead: true,
        haveRead: true,
      });
    }
  };

  return (
    <>
      <Form className="d-flex">
        <MouseoverInfo text="Toggle Favorites">
          <InputGroup className="align-items-center">
            <Form.Check
              inline
              type="checkbox"
              id="bookshelf-favorites"
              name="favorites"
              onChange={handleChange}
              checked={filterBy.favorites}
            />
            <Form.Check.Label
              htmlFor="bookshelf-favorites"
              className="d-none d-md-inline me-2"
            >
              Favorites
            </Form.Check.Label>
            <Form.Check.Label htmlFor="bookshelf-favorites">
              <FontAwesomeIcon icon={faStar} />
            </Form.Check.Label>
          </InputGroup>
        </MouseoverInfo>

        <MouseoverInfo text="Toggle Wishlist">
          <InputGroup className="align-items-center">
            <Form.Check
              inline
              type="checkbox"
              id="bookshelf-wishlist"
              name="wishlist"
              onChange={handleChange}
              checked={filterBy.wishlist}
            />
            <Form.Check.Label
              htmlFor="bookshelf-wishlist"
              className="d-none d-md-inline me-2"
            >
              Wishlist
            </Form.Check.Label>
            <Form.Check.Label htmlFor="bookshelf-wishlist">
              <FontAwesomeIcon icon={faGift} />
            </Form.Check.Label>
          </InputGroup>
        </MouseoverInfo>

        <MouseoverInfo text="Toggle Want-To-Read">
          <InputGroup className="align-items-center">
            <Form.Check
              inline
              type="checkbox"
              name="wantToRead"
              id="bookshelf-want-to-read"
              onChange={handleChange}
              checked={filterBy.wantToRead}
            />
            <Form.Check.Label
              htmlFor="bookshelf-want-to-read"
              className="d-none d-md-inline me-2"
            >
              Want-To-Read
            </Form.Check.Label>
            <Form.Check.Label htmlFor="bookshelf-want-to-read">
              <FontAwesomeIcon icon={faListCheck} />
            </Form.Check.Label>
          </InputGroup>
        </MouseoverInfo>

        <MouseoverInfo text="Toggle Have-Read">
          <InputGroup className="align-items-center ">
            <Form.Check
              inline
              type="checkbox"
              id="bookshelf-have-read"
              name="haveRead"
              onChange={handleChange}
              checked={filterBy.haveRead}
            />
            <Form.Check.Label
              htmlFor="bookshelf-have-read"
              className="d-none d-md-inline me-2"
            >
              Have Read
            </Form.Check.Label>
            <Form.Check.Label htmlFor="bookshelf-have-read">
              <FontAwesomeIcon icon={faGlasses} />
            </Form.Check.Label>
          </InputGroup>
        </MouseoverInfo>

        <MouseoverInfo text="Toggle All">
          <Button variant="outline-primary" onClick={() => handleFilterAll()}>
            <FontAwesomeIcon icon={faCheckDouble} />
          </Button>
        </MouseoverInfo>
      </Form>
    </>
  );
};

export default BookshelfMenu;
