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
  const [searchText, setSearchText] = useState("Harry Potter");

  const handleChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
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
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Search:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter book title"
            onChange={handleChange}
            value={searchText}
          />
        </Form.Group>
        <Button type="submit" className="mt-1">
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
  const { volumeInfo } = res;
  return (
    <Card>
      <Row>
        <Col xs={4}>
          <Image
            src={volumeInfo.imageLinks?.thumbnail}
            alt={`${volumeInfo.title} cover`}
          />
        </Col>
        <Col xs={8}>
          <div>{volumeInfo.title}</div>
          <Authors authors={volumeInfo.authors} />
          <Rating
            averageRating={volumeInfo.averageRating}
            reviewCount={volumeInfo.reviewCount}
          />
          <ReleaseDate publishedDate={volumeInfo.publishedDate} />
          <div>{volumeInfo.pageCount} pages</div>
          <div>
            {volumeInfo.industryIdentifiers.map((isbn, index) => {
              return <ISBN key={`isbn-${index}`} isbn={isbn} />;
            })}
          </div>
        </Col>
      </Row>
    </Card>
  );
};

const Authors = ({ authors }) => {
  return (
    <div>
      by:
      <span className="m-1">
        {authors?.map((author, index) => (
          <Author
            key={`author-${index}`}
            author={author}
            index={index}
            length={authors.length}
          />
        ))}
      </span>
    </div>
  );
};

const Author = ({ author, index, length }) => {
  let returnValue = "";

  if (index === 0) returnValue = author;
  else if (index + 1 === length) returnValue = `, and ${author}`;
  else if (index > 0 && index + 1 !== length) returnValue = `, ${author}`;

  return <span>{returnValue}</span>;
};

const ISBN = ({ isbn }) => {
  return (
    <div>
      {isbn.type}: {isbn.identifier}
    </div>
  );
};

const Rating = ({ averageRating, reviewCount }) => {
  return averageRating ? (
    <div>
      {averageRating} <span>{reviewCount}</span>
    </div>
  ) : (
    <div>No reviews</div>
  );
};

const ReleaseDate = ({ publishedDate }) => {
  return <div>Released: {publishedDate}</div>;
};

const PageCount = () => {
  return null;
};

export default App;
