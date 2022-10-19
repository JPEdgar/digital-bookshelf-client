import React, { useEffect } from "react";

import { Link } from "react-router-dom";
import { Navbar, Container, Nav, Image } from "react-bootstrap";

import SearchBar from "./SearchBar";

import ACTIONS from "../../constants/actionTypes";
import { searchForBooksOnline } from "../../utilities";
import { useBookshelfContext } from "../../hooks";

const Navigation = () => {
  const { state, dispatch, API } = useBookshelfContext();
  const { searchData } = state;
  const { searchQuery } = searchData;

  const handleSearch = async (query) => {
    if (!query) return;
    const searchquery = `${API}/volumes?q=${query}`;
    const searchResults = await searchForBooksOnline(searchquery);
    dispatch({ type: ACTIONS.SET_SEARCH_RESULTS, payload: searchResults });
  };

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      handleSearch(searchQuery);
    }, 1000);
    return () => clearTimeout(delayDebounce);
  }, [searchQuery]);

  return (
    <>
      <Navbar
        sticky="top"
        bg="light"
        variant="light"
        collapseOnSelect
        expand="md"
      >
        <Container>
          <Navbar.Brand as={Link} to="/">
            <Image
              alt=""
              src="https://picsum.photos/200"
              width="30"
              height="30"
              className="d-inline-block align-top me-1"
            />
            Digital Bookshelf
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">
                Home
              </Nav.Link>
              <Nav.Link as={Link} to="details">
                Book Details
              </Nav.Link>
            </Nav>
            <SearchBar />
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Navigation;
