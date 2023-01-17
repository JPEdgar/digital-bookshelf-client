import React, { useEffect } from "react";

import { Link } from "react-router-dom";
import { Navbar, Container, Nav, Image, Button } from "react-bootstrap";

import SearchBar from "./SearchBar";
import MenuDropdown from "./MenuDropdown";

import BOOKSHELF_TYPES from "../../constants/bookshelfTypes";
import { searchForBooksOnline } from "../../utilities";
import { useBookshelfContext, useAuthContext } from "../../hooks";

const Navigation = () => {
  const { bookshelfState, dispatch, API } = useBookshelfContext();
  const { searchData } = bookshelfState;
  const { searchQuery } = searchData;
  const { userState } = useAuthContext();
  const { user } = userState;

  const handleSearch = async (query) => {
    if (!query) return;
    const searchquery = `${API}/volumes?q=${query}`;
    const searchResults = await searchForBooksOnline(searchquery);
    dispatch({
      type: BOOKSHELF_TYPES.SET_SEARCH_RESULTS,
      payload: searchResults,
    });
  };

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      handleSearch(searchQuery);
    }, 1000);
    return () => clearTimeout(delayDebounce);
  }, [searchQuery]);

  // useEffect(() => console.log("userState = ", userState), [userState]);
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
              <Nav.Link as={Link} to="user-search">
                User Search
              </Nav.Link>
            </Nav>
            <SearchBar />
            {user ? (
              <MenuDropdown />
            ) : (
              <div>
                <Nav.Link as={Link} to="login">
                  Log In
                </Nav.Link>
                <Nav.Link as={Link} to="signup">
                  Sign Up
                </Nav.Link>
              </div>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Navigation;
