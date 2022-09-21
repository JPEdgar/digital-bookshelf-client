import React, { useEffect } from "react";

import axios from "axios";
import { Link } from "react-router-dom";
import {
  Navbar,
  Container,
  Nav,
  Form,
  Button,
  Image,
  Dropdown,
  Row,
  Col,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarOutline } from "@fortawesome/free-regular-svg-icons";

import { useBookshelfContext } from "../../Context/Bookshelf/BookshelfContext";

const Navigation = () => {
  const {
    searchResults,
    setSearchResults,
    searchData,
    setSearchData,
    API,
    toggleToBookshelf,
  } = useBookshelfContext();

  const { searchQuery } = searchData;

  const handleChange = (e) => {
    setSearchData((curr) => ({ ...curr, [e.target.name]: e.target.value }));
  };

  const handleSearch = async (query) => {
    if (!query) return;
    const search = `${API}/volumes?q=${query}`;
    axios.get(search).then((res) => setSearchResults(res.data));
  };

  const handleBookstoreClick = (isbnObj) => {
    toggleToBookshelf(isbnObj);
  };

  const handleSearchDetails = (test) => {
    console.log(test);
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
              {/* <Nav.Link as={Link} to="">Pricing</Nav.Link> */}
            </Nav>
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
                    <Dropdown.Item
                      key={`searchResultDropdownItem-${index}`}
                      as="div"
                    >
                      <Row>
                        <Col
                          as={Link}
                          to="details"
                          xs={0}
                          sm={3}
                          style={{
                            height: "90px",
                          }}
                          className="justify-content-center d-none d-sm-flex"
                          onClick={() => handleSearchDetails(result.volumeInfo)}
                        >
                          <Image
                            src={result.volumeInfo.imageLinks?.thumbnail}
                            alt="cover"
                          />
                        </Col>
                        <Col
                          as={Link}
                          to="details"
                          xs={10}
                          sm={7}
                          style={{
                            height: "90px",
                          }}
                          onClick={() => handleSearchDetails(result.volumeInfo)}
                        >
                          <div
                            style={{
                              overflow: "hidden",
                            }}
                          >
                            {result.volumeInfo.title}
                          </div>
                          {result.volumeInfo.subtitle && (
                            <div
                              style={{
                                overflow: "hidden",
                              }}
                            >
                              {result.volumeInfo.subtitle}
                            </div>
                          )}
                          <div>
                            by:
                            <span className="m-1">
                              {result.volumeInfo.authors?.map(
                                (author, index) => (
                                  <Author
                                    key={`author-${index}`}
                                    author={author}
                                    index={index}
                                    length={result.volumeInfo.authors.length}
                                  />
                                )
                              )}
                            </span>
                          </div>
                        </Col>
                        <Col xs={2}>
                          <FontAwesomeIcon
                            icon={faStarOutline}
                            onClick={() =>
                              handleBookstoreClick(
                                result.volumeInfo.industryIdentifiers
                              )
                            }
                          />
                        </Col>
                      </Row>
                    </Dropdown.Item>
                  ))}
              </Dropdown.Menu>
            </Dropdown>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

const Author = ({ author, index, length }) => {
  let returnValue = "";

  if (index === 0) returnValue = author;
  else if (index + 1 === length) returnValue = `, and ${author}`;
  else if (index > 0 && index + 1 !== length) returnValue = `, ${author}`;

  return <span>{returnValue}</span>;
};

export default Navigation;
