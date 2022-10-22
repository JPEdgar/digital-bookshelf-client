import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";
import { Dropdown, Image, Row, Col, Button } from "react-bootstrap";

import FavoritesIcon from "../elements/FavoritesIcon";
import WishListIcon from "../elements/WishListIcon";
import ToReadListIcon from "../elements/ToReadListIcon";
import HaveReadIcon from "../elements/HaveReadIcon";

import BOOKSHELF_TYPES from "../../constants/bookshelfTypes";
import SEARCH_TYPE from "../../constants/searchTypes";
import {
  createAuthorString,
  getFromShelf,
  searchForBooksOnline,
} from "../../utilities";
import { useBookshelfContext } from "../../hooks";

const SearchBar = () => {
  const { API, bookshelfState, dispatch } = useBookshelfContext();
  const { searchData, searchResults } = bookshelfState;
  const { searchQuery } = searchData;

  const [openDropdown, setOpenDropdown] = useState(false);
  const [mouseEnter, setMouseEnter] = useState(false);

  const handleChange = (e) =>
    dispatch({ type: BOOKSHELF_TYPES.UPDATE_SEARCH_PARAMS, payload: e.target });

  const handleSearchDetails = (details, bookshelfID) => {
    dispatch({
      type: BOOKSHELF_TYPES.SET_BOOK_DETAILS,
      payload: { ...details, bookshelfID },
    });
  };

  const handleClick = (bookData, id) => {
    setOpenDropdown(false);
    handleSearchDetails(bookData, id);
  };

  // const paginateSearch = async (query) => {
  //   if (!query) return;
  //   const searchquery = `${API}/volumes?q=${query}`;
  //   const searchResults = await searchForBooksOnline(searchquery);
  //   dispatch({ type: ACTIONS.SET_SEARCH_RESULTS, payload: searchResults });
  // };

  const test = () => {
    console.log(searchResults);
  };

  useEffect(() => {
    if (!openDropdown) return;

    const delayDebounce = setTimeout(() => {
      if (mouseEnter) return () => clearTimeout(delayDebounce);
      setOpenDropdown(false);
    }, 1000);

    return () => clearTimeout(delayDebounce);
  }, [mouseEnter]);

  return (
    <Dropdown
      className="w-50"
      show={openDropdown}
      onMouseEnter={() => setMouseEnter(true)}
      onMouseLeave={() => setMouseEnter(false)}
    >
      <Dropdown.Toggle
        style={{ width: "100%" }}
        onClick={() => setOpenDropdown((curr) => !curr)}
      >
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
          // onClick={() => setOpenDropdown(true)}
        />
      </Dropdown.Toggle>

      <Dropdown.Menu className="w-100">
        {searchResults?.length > 0 &&
          searchResults.map((result, index) => {
         
            const bookshelfSearchResult = getFromShelf(
              bookshelfState.bookshelf,
              SEARCH_TYPE.BOOKSHELF_ID,
              result.id
            );
            const bookData = bookshelfSearchResult
              ? bookshelfSearchResult
              : result.volumeInfo;
              console.log("Search Bar > bookData = ", bookData)
            return (
              <Dropdown.Item key={`searchResultDropdownItem-${index}`} as="div">
                <Row>
                  <Col
                    as={Link}
                    to="details"
                    xs={0}
                    sm={3}
                    style={{ height: "90px" }}
                    className="justify-content-center d-none d-sm-flex"
                    onClick={() => handleClick(bookData, result.id)}
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
                    style={{ height: "90px" }}
                    onClick={() => handleClick(bookData, result.id)}
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
                    <div> <FavoritesIcon onClick={(e) => e.stopPropagation} bookshelfID={result.id} bookData={bookData} /> </div>
                    <div> <WishListIcon onClick={(e) => e.stopPropagation} bookshelfID={result.id} bookData={bookData} /> </div>
                    <div> <ToReadListIcon onClick={(e) => e.stopPropagation} bookshelfID={result.id} bookData={bookData} /> </div>
                    <div> <HaveReadIcon onClick={(e) => e.stopPropagation} bookshelfID={result.id} bookData={bookData} /> </div>
                  </Col>
                </Row>
              </Dropdown.Item>
            );
          })}
        <Button size="sm" className="w-100" onClick={() => test()}>
          V
        </Button>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default SearchBar;
