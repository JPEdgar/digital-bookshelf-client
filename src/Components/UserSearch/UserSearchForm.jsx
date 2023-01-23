import React, { useState } from "react";

import { Form } from "react-bootstrap";

import { getUserDetails } from "../../actions/user";

const UserSearchForm = ({ setSearchResults }) => {
  const [searchText, setSearchText] = useState("test2@test.com");

  const handleChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleClick = async (testText) => {
    const test = await getUserDetails(testText);
    // console.log("test = ", test)
    setSearchResults(test);
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
