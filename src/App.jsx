import React from "react";

import { Routes, Route, Navigate } from "react-router-dom";
import { Container } from "react-bootstrap";

import Navigation from "./components/Navigation";
import BookDetails from "./components/BookDetails";
import Bookshelf from "./components/Bookshelf";
import SignUp from "./components/SignUp";
import LogIn from "./components/LogIn";
import UserSearch from "./components/UserSearch";
import AccountSettings from "./components/AccountSettings";

import { useBookshelfContext, useAuthContext, useUserContext } from "./hooks"; // temp

import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/css/index.css";

const App = () => {
  const { bookshelfState } = useBookshelfContext(); // temp
  const { userDetails } = useUserContext();
  const { authState } = useAuthContext();

  return (
    <>
      <Navigation />
      <button onClick={() => console.log(bookshelfState)}>
        Log bookshelfState
      </button>
      <button onClick={() => console.log(authState)}>Log authState</button>
      <button onClick={() => console.log(userDetails)}>log userDetails</button>

      <Container>
        <Routes>
          <Route path="/" element={<Bookshelf />} />
          <Route path="/details" element={<BookDetails />} />
          <Route
            path="/signup"
            element={!authState.email ? <SignUp /> : <Navigate to="/" />}
          />
          <Route
            path="/login"
            element={!authState.email ? <LogIn /> : <Navigate to="/" />}
          />
          <Route path="/user-search" element={<UserSearch />} />
          <Route path="/user-settings" element={<AccountSettings />} />
        </Routes>
      </Container>
    </>
  );
};

export default App;
