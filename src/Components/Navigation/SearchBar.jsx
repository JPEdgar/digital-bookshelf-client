import React from "react";

import { Link } from "react-router-dom";
import { Dropdown, Image, Row, Col } from "react-bootstrap";

import FavoritesIcon from "../elements/FavoritesIcon";

import ACTIONS from "../../constants/actionTypes";
import SEARCH_TYPE from "../../constants/searchTypes";
import { createAuthorString, getFromShelf } from "../../utilities";
import { useBookshelfContext } from "../../hooks";

const SearchBar = () => {
  const { state, dispatch } = useBookshelfContext();

  const { searchData, searchResults } = state;
  const { searchQuery } = searchData;

  const handleChange = (e) =>
    dispatch({ type: ACTIONS.UPDATE_SEARCH_PARAMS, payload: e.target });

  const handleSearchDetails = (details, bookshelfID) => {
    dispatch({
      type: ACTIONS.SET_BOOK_DETAILS,
      payload: { ...details, bookshelfID },
    });
  }

  return (
    <Dropdown className="w-50">
      <Dropdown.Toggle style={{ width: "100%" }}>
        <input
          name="searchQuery"
          placeholder="Search for books"
          onChange={handleChange}
          value={searchQuery}
          type="search"
          aria-label="Search"
          className="w-100"
          style={{ maxWidth: "95%" }}
          autoComplete="off"
        />
      </Dropdown.Toggle>

      <Dropdown.Menu className="w-100">
        {searchResults?.length > 0 &&
          searchResults.map((result, index) => {
            const bookshelfSearchResult = getFromShelf(
              state.bookshelf,
              SEARCH_TYPE.BOOKSHELF_ID,
              result.id
            );
            const bookData = bookshelfSearchResult
              ? bookshelfSearchResult
              : result.volumeInfo;

            return (
              <Dropdown.Item key={`searchResultDropdownItem-${index}`} as="div">
                <Row>
                  <Col
                    as={Link}
                    to="details"
                    xs={0}
                    sm={3}
                    style={{ height: "90px", backgroundColor: "blue" }}
                    className="justify-content-center d-none d-sm-flex"
                    onClick={() => handleSearchDetails(bookData, result.id)}
                  >
                    <Image
                      src={bookData.imageLinks?.thumbnail}
                      alt="cover"
                      style={{ width: "auto", maxWidth: "100px" }}
                    />
                  </Col>
                  <Col
                    as={Link}
                    to="details"
                    xs={10}
                    sm={7}
                    style={{ height: "90px", backgroundColor: "orange" }}
                    onClick={() => handleSearchDetails(bookData, result.id)}
                  >
                    <div style={{ overflow: "hidden" }}>{bookData.title}</div>
                    {bookData.subtitle && (
                      <div style={{ overflow: "hidden" }}>
                        {bookData.subtitle}
                      </div>
                    )}
                    <div style={{ overflow: "hidden" }}>
                      by:
                      <span className="ms-1">
                        {createAuthorString(bookData.authors)}
                      </span>
                    </div>
                  </Col>
                  <Col xs={2}>
                    <div style={{ backgroundColor: "green" }}>
                      <FavoritesIcon
                        bookshelfID={result.id}
                        bookData={bookData}
                      />
                    </div>
                  </Col>
                </Row>
              </Dropdown.Item>
            );
          })}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default SearchBar;
