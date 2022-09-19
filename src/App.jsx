import React, { useState, useEffect } from "react";

import axios from "axios";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Image,
  Card,
} from "react-bootstrap";

import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  const [tempRes, setTestRes] = useState();
  const [searchText, setSearchText] = useState("");

  const handleChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleClick = () => {
    handleSearch(searchText);
  };

  const handleSearch = async (query) => {
    const api =
      // "https://www.googleapis.com/books/v1/volumes?q=harry+potter+inauthor:rowling";
      `https://www.googleapis.com/books/v1/volumes?q=${query}`;
    // "https://www.googleapis.com/books/v1/volumes?q=harry+potter";

    axios.get(api).then((res) => setTestRes(res.data));
  };

  //   useEffect(() => {
  //     const Test = async () => {
  //       const temp = await axios.get(api).then((res) => res.data);
  //       console.log(temp);
  //       //   console.log(JSON.parse(temp));
  //     };

  //     Test();
  //   }, []);

  //   useEffect(() => console.log(searchText), [searchText]);
  useEffect(() => console.log(tempRes), [tempRes]);

  return (
    <Container>
      <Form>
        <Form.Group>
          <Form.Label>Search:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter book title"
            onChange={handleChange}
          />
        </Form.Group>
        <Button className="mt-1" onClick={() => handleClick()}>
          Search
        </Button>
      </Form>
      <hr />
      {tempRes?.items.length > 0 &&
        tempRes.items.map((res, index) => (
          <SearchResult key={`res-${index}`} res={res} />
        ))}
    </Container>
  );
};

const SearchResult = ({ res }) => {
  console.log(res);
  const {volumeInfo} = res
  return (
    <Card>
      <Row>
        <Col xs={4}>
          <Image src={volumeInfo.imageLinks.thumbnail} alt={`${volumeInfo.title} cover`} />
        </Col>
        <Col xs={8}>
        <Row>
            {volumeInfo.title}
        </Row>
        </Col>
      </Row>
    </Card>
  );
};

export default App;
