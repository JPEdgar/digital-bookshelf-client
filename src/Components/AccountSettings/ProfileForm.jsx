import React, { useState, useEffect } from "react";

import { Form, Button, Image } from "react-bootstrap";
import FileBase from "react-file-base64";

import USER_TYPES from "../../constants/userTypes";
// import { getUserDetails,setUserDetails } from "../../actions/user";

import { useUserDetails, useAuthContext } from "../../hooks";

import defaultUserDetails from "../../constants/initializeUserDetails";

const ProfileForm = () => {
  const { userDetails, updateUserDetails } = useUserDetails();
  const { authState } = useAuthContext();
  const [inputData, setInputData] = useState(defaultUserDetails);

  const handleChange = (e) =>
    setInputData((curr) => ({ ...curr, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateUserDetails(inputData, authState.token); // updates both state and server
    // userDispatch({ type: USER_TYPES.SET_USER_DETAILS, payload: inputData });
  };

  // useEffect(() => console.log("inputData = ", inputData), [inputData]);

  useEffect(() => {
    if (userDetails?._id) setInputData(userDetails);
  }, [userDetails]);

  // useEffect(() => console.log("userDetails = ", userDetails), [userDetails]);

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
