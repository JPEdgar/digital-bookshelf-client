import React, { useEffect } from "react";

import axios from "axios";
import { Link } from "react-router-dom";
import { Navbar, Container, Nav, Image } from "react-bootstrap";

import SearchBar from "./SearchBar";
import { useBookshelfContext } from "../../Context/Bookshelf/BookshelfContext";

const Navigation = () => {
  const { setSearchResults, searchData, API } = useBookshelfContext();

  const { searchQuery } = searchData;

  const handleSearch = async (query) => {
    if (!query) return;
    const search = `${API}/volumes?q=${query}`;
    axios.get(search).then((res) => setSearchResults(res.data));
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
