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
import ExtendedBookSearch from "./components/ExtendedBookSearch"
import ExtendedFriendSearch from "./components/ExtendedFriendSearch"

import useAuthContext from "./hooks/context/useAuthContext"; 
import useUserContext from "./hooks/context/useUserContext"; // temp
import { useDeleteUser, useUserFriendsList, useBookshelf } from "./hooks"; // temp

import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/css/index.css";

const App = () => {
  const { authState } = useAuthContext(); 
  const { deleteUser } = useDeleteUser(); // temp
  const { userDetails } = useUserContext(); // temp
  const { getFriendsList, getFriendStatus } = useUserFriendsList(); // temp
  const { bookshelf } = useBookshelf(); // temp

  const handleClick = async () => {
    const status = getFriendStatus("6429b1aaaf087725cab37ea7");
    console.log(status);
  };

  return (
    <>
      <Navigation />

      <Container>
        <Routes>
          <Route path="/" element={authState.email ? <Bookshelf /> : <>bookshelf</>} />
          <Route path="/signup" element={!authState.email ? <SignUp /> : <Navigate to="/" />} />
          <Route path="/login" element={!authState.email ? <LogIn /> : <Navigate to="/" />} />
          <Route path="/user-settings" element={ authState.email ? <AccountSettings /> : <Navigate to="/" /> } />
          <Route path="/friends" element={authState.email ? <Friends /> : <Navigate to="/" />} />
          <Route path="/friend-search" element={<ExtendedFriendSearch/>} />
          <Route path="/book-details" element={<BookDetails/>} />
          <Route path="/book-search" element={<ExtendedBookSearch/>} />
        </Routes>
      </Container>
    </>
  );
};

export default App;

/*
      <button onClick={() => console.log(authState)}>Log authState</button>
      <button onClick={() => console.log(userDetails)}>Log user details</button>
      {authState.email && (
        <button onClick={() => deleteUser(authState)}>
          Delete: {authState.email}
        </button>
      )}
      {authState.email && ( <button onClick={() => handleClick()}> log friends list test status </button> )}
      {authState.email && (
        <button onClick={() => console.log(bookshelf)}>log bookshelf</button>
      )}
*/
