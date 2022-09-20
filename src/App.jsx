import React from "react";

import { Container } from "react-bootstrap";

import Navigation from "./Components/Navigation";

import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  return (
    <>
      <Navigation />
      <Container style={{ backgroundColor: "yellow" }}>
        <div style={{ height: "1000px" }}>dwww</div>
      </Container>
    </>
  );
};

export default App;
