import React from "react";

import { Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";

import Navigation from "./Components/Navigation";
import BookDetails from "./Components/BookDetails";

import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  return (
    <>
      <Navigation />
      <Container>
        <Routes>
          <Route path="/" element={null} />
          <Route path="/details" element={<BookDetails />} />
        </Routes>
      </Container>
    </>
  );
};

export default App;
