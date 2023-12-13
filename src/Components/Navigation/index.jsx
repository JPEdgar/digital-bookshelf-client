import React, { useEffect } from "react";

import { Link, useLocation } from "react-router-dom";
import { Navbar, Container, Nav, Image, Button } from "react-bootstrap";

import Account from "./Account";
import FriendIcon from "../elements/FriendIcon";

import { useAuthDetails, useUserDetails } from "../../hooks";
import UserSearch from "../elements/UserSearch";
import BookSearch from "../elements/BookSearch";

const Navigation = () => {
  const { authDetails } = useAuthDetails();
  const location = useLocation();

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
              {/* <Nav.Link as={Link} to="/"> Home </Nav.Link> */}
              {authDetails.email && (
                <Nav.Link
                  as={Link}
                  to="/friends"
                  className="d-flex align-items-center"
                >
                  <FriendIcon />
                </Nav.Link>
              )}
              {location.pathname !== "/friend-search" && <UserSearch />}
              {location.pathname !== "/book-search" && <BookSearch />}
            </Nav>
            {authDetails.email ? (
              <Account />
            ) : (
              <>
                <span>
                  <Nav.Link as={Link} to="login">
                    Log In
                  </Nav.Link>
                </span>
                <span className="ms-2">
                  <Nav.Link as={Link} to="signup">
                    Sign Up
                  </Nav.Link>
                </span>
              </>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Navigation;
