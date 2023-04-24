import React from "react";

import { Routes, Route, Navigate } from "react-router-dom";
import { Container } from "react-bootstrap";

import Navigation from "./components/Navigation";
import SignUp from "./components/SignUp";
import LogIn from "./components/LogIn";
import AccountSettings from "./components/AccountSettings";
import Friends from "./components/Friends";
import Bookshelf from "./components/Bookshelf";
import BookDetails from "./components/BookDetails";
import ExtendedBookSearch from "./components/ExtendedBookSearch";
import ExtendedFriendSearch from "./components/ExtendedFriendSearch";

import useAuthContext from "./hooks/context/useAuthContext";
import { useBookshelf } from "./hooks";

import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/css/index.css";

const App = () => {
  const { authState } = useAuthContext();
  const {bookshelf} = useBookshelf()

  const logBookshelf = () => {
    console.log(bookshelf.contents)
  }

  return (
    <>
      <Navigation />

      <Container>
        <button onClick={() => logBookshelf()}>Log bookshelf</button>
        <Routes>
          <Route
            path="/"
            element={authState.email ? <Bookshelf /> : <>bookshelf</>}
          />
          <Route
            path="/signup"
            element={!authState.email ? <SignUp /> : <Navigate to="/" />}
          />
          <Route
            path="/login"
            element={!authState.email ? <LogIn /> : <Navigate to="/" />}
          />
          <Route
            path="/user-settings"
            element={
              authState.email ? <AccountSettings /> : <Navigate to="/" />
            }
          />
          <Route
            path="/friends"
            element={authState.email ? <Friends /> : <Navigate to="/" />}
          />
          <Route path="/friend-search" element={<ExtendedFriendSearch />} />
          <Route path="/book-details" element={<BookDetails />} />
          <Route path="/book-search" element={<ExtendedBookSearch />} />
        </Routes>
      </Container>
    </>
  );
};

export default App;
