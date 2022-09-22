import React from "react";

import { Link } from "react-router-dom";
import { Dropdown, Image, Row, Col } from "react-bootstrap";

import FavoritesIcon from "../elements/FavoritesIcon";
import { createAuthorString } from "../../utilities";
import { useBookshelfContext } from "../../Context/Bookshelf/BookshelfContext";

const SearchBar = () => {
  const {
    searchResults,
    searchData,
    setSearchData,
    toggleToBookshelf,
    setBookDetail,
    isOnBookshelf,
  } = useBookshelfContext();

  const { searchQuery } = searchData;

  const handleChange = (e) => {
    setSearchData((curr) => ({ ...curr, [e.target.name]: e.target.value }));
  };

  const handleSearchDetails = (details) => {
    setBookDetail(details);
  };

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
        />
      </Dropdown.Toggle>

      <Dropdown.Menu className="w-100">
        {searchResults.items?.length > 0 &&
          searchResults.items.map((result, index) => (
            <Dropdown.Item key={`searchResultDropdownItem-${index}`} as="div">
              <Row>
                <Col
                  as={Link}
                  to="details"
                  xs={0}
                  sm={3}
                  style={{ height: "90px" }}
                  className="justify-content-center d-none d-sm-flex"
                  onClick={() => handleSearchDetails(result.volumeInfo)}
                >
                  <Image
                    src={result.volumeInfo.imageLinks?.thumbnail}
                    alt="cover"
                    style={{ width: "auto", maxWidth: "100px" }}
                  />
                </Col>
                <Col
                  as={Link}
                  to="details"
                  xs={10}
                  sm={7}
                  style={{ height: "90px" }}
                  onClick={() => handleSearchDetails(result.volumeInfo)}
                >
                  <div style={{ overflow: "hidden" }}>
                    {result.volumeInfo.title}
                  </div>
                  {result.volumeInfo.subtitle && (
                    <div style={{ overflow: "hidden" }}>
                      {result.volumeInfo.subtitle}
                    </div>
                  )}
                  <div style={{ overflow: "hidden" }}>
                    by:
                    <span className="ms-1">
                      {createAuthorString(result.volumeInfo.authors)}
                    </span>
                  </div>
                </Col>
                <Col xs={2}>
                  <FavoritesIcon
                    toggle={isOnBookshelf(
                      null,
                      result.volumeInfo.industryIdentifiers
                    )}
                    onClick={() => toggleToBookshelf(
                      result.volumeInfo.industryIdentifiers
                    )}
                  />
                </Col>
              </Row>
            </Dropdown.Item>
          ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default SearchBar;
