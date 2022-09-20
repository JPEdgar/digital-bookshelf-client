import React from "react";

import axios from "axios";
import {
  Navbar,
  Container,
  Nav,
  Form,
  Button,
  Image,
  Dropdown,
} from "react-bootstrap";

import { useBookshelfContext } from "../../Context/Bookshelf/BookshelfContext";

const Navigation = () => {
  const { searchResults, setSearchResults, searchData, setSearchData, API } =
    useBookshelfContext();

  const handleChange = (e) => {
    setSearchData((curr) => ({ ...curr, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch(searchData.searchQuery);
  };

  const handleSearch = async (query) => {
    console.log("query = ", query);
    if (!query) return;
    const search = `${API}/volumes?q=${query}`;
    axios.get(search).then((res) => setSearchResults(res.data));
  };
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
          <Navbar.Brand href="#home">
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
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#features">Features</Nav.Link>
              <Nav.Link href="#pricing">Pricing</Nav.Link>
            </Nav>
            <Form className="d-flex" onSubmit={handleSubmit}>
              <Form.Control
                name="searchQuery"
                placeholder="Search for books"
                onChange={handleChange}
                value={searchData.searchQuery}
                type="search"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="outline-success" type="submit">
                Search
              </Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Navigation;
