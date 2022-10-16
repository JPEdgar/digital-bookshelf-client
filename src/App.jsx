import React from "react";

import { Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";

import Navigation from "./components/Navigation";
import BookDetails from "./components/BookDetails";
import Bookshelf from "./components/Bookshelf";
import { getBooks, getBook, updateBook, setBook, deleteBook } from "./actions/bookshelf"
import tempData from "./temp.json"

import useBookshelfContext from "./hooks/useBookshelfContext"; // temp

import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  const { bookshelf } = useBookshelfContext(); // temp



  return (
    <>
      <Navigation />
      <button onClick={() => console.log(bookshelf)}>Log bookshelf</button>
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
