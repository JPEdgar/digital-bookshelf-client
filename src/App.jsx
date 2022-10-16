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
import ACTIONS from "./constants/actionTypes";
const App = () => {
  const { bookshelf, dispatch } = useBookshelfContext(); // temp

  const id = "634b516377bf42f4300543bd"

  const handleClick = async () => {
    dispatch({type:ACTIONS.SET_BOOK, payload: tempData})
  }

  const handleReset = () => {
    dispatch({type:"reset"})
  }

  return (
    <>
      <Navigation />
      <button onClick={() => console.log(bookshelf)}>Log bookshelf</button>
      <Container>
        <button onClick={() => handleClick()}>Click</button>
        <button onClick={() => handleReset()}>Reset</button>

        <Routes>
          <Route path="/" element={<Bookshelf />} />
          <Route path="/details" element={<BookDetails />} />
        </Routes>
      </Container>
    </>
  );
};

export default App;
