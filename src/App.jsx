import React from "react";

import { Container } from "react-bootstrap";

import Navbar from "./Components/Navbar";
import Search from "./Components/Search";

import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  return (
    <Container>
      <Navbar />
      <hr />
      <Search />
    </Container>
  );
};

export default App;
