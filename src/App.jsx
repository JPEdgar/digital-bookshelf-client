import React from "react";

import { Routes, Route, Navigate } from "react-router-dom";
import { Container } from "react-bootstrap";

import Navigation from "./components/Navigation";
import SignUp from "./components/SignUp";
import LogIn from "./components/LogIn";
import AccountSettings from "./components/AccountSettings";

import useAuthContext from "./hooks/context/useAuthContext"; // temp
import useUserContext from "./hooks/context/useUserContext"; // temp
import { useDeleteUser } from "./hooks"; // temp

import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/css/index.css";

const App = () => {
  const { authState } = useAuthContext(); //temp
  const { deleteUser } = useDeleteUser(); // temp
  const { userDetails } = useUserContext(); // temp

  return (
    <>
      <Navigation />
      <button onClick={() => console.log(authState)}>Log authState</button>
      <button onClick={() => console.log(userDetails)}>Log user details</button>
      {authState.email && (
        <button onClick={() => deleteUser(authState)}>
          Delete: {authState.email}
        </button>
      )}

      <Container>
        <Routes>
          <Route path="/" element={null} />
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
        </Routes>
      </Container>
    </>
  );
};

export default App;
