import React from "react";

import { Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";

import Navigation from "./Components/Navigation";
import BookDetails from "./Components/BookDetails";
import Bookshelf from "./Components/Bookshelf";

import { useBookshelfContext } from "./Context/Bookshelf/BookshelfContext";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  const { bookshelf } = useBookshelfContext();
  return (
    <>
      <Navigation />
      <button onClick={() => console.log(bookshelf)}>Click</button>
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
