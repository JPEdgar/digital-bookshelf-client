import React, { useState } from "react";

import {
  Form,
  Dropdown,
  Stack,
  Image,
  InputGroup,
  ButtonGroup,
  Button,
  Row,
} from "react-bootstrap";

import { useSearchDetails } from "../../hooks";

const FriendSearch = () => {
  const [query, setQuery] = useState({ byEmail: "", byHandle: "" });
  const [res, setRes] = useState([]);
  const { userSearchList } = useSearchDetails();
  const clearForm = () => {
    setQuery({ byEmail: "", byHandle: "" });
  };

  const clearResults = () => {
    setRes([]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleChange = (e) => {
    setQuery((curr) => ({ ...curr, [e.target.name]: e.target.value }));
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <InputGroup className="mt-3">
          <InputGroup.Text style={{ width: "7.5rem" }}>
            User Name:
          </InputGroup.Text>
          <Form.Control
            placeholder="Search by user name"
            name="byHandle"
            onChange={handleChange}
            value={query.byHandle}
          />
        </InputGroup>

        <InputGroup className="mt-3">
          <InputGroup.Text style={{ width: "7.5rem" }}>
            User Email:
          </InputGroup.Text>
          <Form.Control
            placeholder="Search by user email"
            name="byEmail"
            onChange={handleChange}
            value={query.byEmail}
          />
        </InputGroup>

        <div className="d-flex justify-content-between w-100">
          <Button onClick={() => clearResults()} variant="danger">
            Clear Results
          </Button>
          <ButtonGroup>
            <Button onClick={() => clearForm()} variant="warning">
              Clear
            </Button>
            <Button type="submit" variant="success" className="px-4">
              Search
            </Button>
          </ButtonGroup>
        </div>
      </Form>
    </>
  );
};

export default FriendSearch;
