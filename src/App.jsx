import React from "react";

import { Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";

import Navigation from "./components/Navigation";
import BookDetails from "./components/BookDetails";
import Bookshelf from "./components/Bookshelf";

import { useBookshelfContext } from "./hooks"; // temp

import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  const { state } = useBookshelfContext(); // temp

  return (
    <>
      <Navigation />
      <button onClick={() => console.log(state)}>Log State</button>
      <Container>
        <Routes>
          <Route path="/" element={<Bookshelf />} />
          <Route path="/details" element={<BookDetails />} />
        </Routes>
      </Container>
    </>
  );
};

export default App;
