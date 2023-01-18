import React, { useState, useEffect } from "react";

import { Form, Button, Image } from "react-bootstrap";
import FileBase from "react-file-base64";

import { useUserContext } from "../../hooks";

import USER_TYPES from "../../constants/userTypes";
import { setUserDetails } from "../../actions/user";

const ProfileForm = () => {

  const { userDetails, dispatch } = useUserContext();
  const [inputData, setInputData] = useState({
    avatar: "",
    email: "",
    firstName: "",
    friends: [],
    handle: "",
    lastName: "",
    userID: "",
  });

  const handleChange = (e) =>
    setInputData((curr) => ({ ...curr, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    await setUserDetails(inputData);
    dispatch({ type: USER_TYPES.SET_USER_DETAILS, payload: inputData });
  };

  useEffect(() => console.log("inputData = ", inputData), [inputData]);

  useEffect(() => {
    if (userDetails._id) setInputData(userDetails);
  }, [userDetails]);

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="d-grid">
          <Form.Label>Avatar:</Form.Label>
          <Image
            alt="avatar image"
            src={inputData.avatar}
            thumbnail
            style={{ maxHeight: "150px" }}
          />
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) =>
              setInputData((curr) => ({ ...curr, avatar: base64 }))
            }
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Handle:</Form.Label>
          <Form.Control
            type="text"
            name="handle"
            placeholder="Online handle"
            value={inputData.handle}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>First Name:</Form.Label>
          <Form.Control
            type="text"
            name="firstName"
            placeholder="First name"
            value={inputData.firstName}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Last Name:</Form.Label>
          <Form.Control
            type="text"
            name="lastName"
            placeholder="Last name"
            value={inputData.lastName}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Last Name:</Form.Label>
          <Form.Control
            type="email"
            name="email"
            placeholder="Email"
            value={inputData.email}
            onChange={handleChange}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
};

export default ProfileForm;
