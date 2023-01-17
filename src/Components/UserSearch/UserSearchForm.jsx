import React, { useState } from "react";

import { Form } from "react-bootstrap";

import { getUser } from "../../actions/auth";

const UserSearchForm = ({ setSearchResults }) => {
  const [searchText, setSearchText] = useState("test@test.com");

  const handleChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleClick = async (testText) => {
    const { data } = await getUser(testText);
    setSearchResults(data);
  };

  return (
    <>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Search email address</Form.Label>
          <Form.Control
            type="search"
            placeholder="Enter email"
            autoComplete="off"
            value={searchText}
            onChange={handleChange}
          />
        </Form.Group>
      </Form>
      <button onClick={() => handleClick(searchText)}>Click</button>
    </>
  );
};

export default UserSearchForm;
