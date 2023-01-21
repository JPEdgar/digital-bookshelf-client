import React, { useState, useEffect } from "react";

import { Form, Button, Image, Row, Col } from "react-bootstrap";
import FileBase from "react-file-base64";

import { useUserDetails, useAuthContext } from "../../hooks";

import defaultUserDetails from "../../constants/initializeUserDetails";

import LockUnlockIcon from "../elements/LockUnlockIcon";

const ProfileForm = () => {
  const { userDetails, updateUserDetails } = useUserDetails();
  const { authState } = useAuthContext();
  const [inputData, setInputData] = useState(defaultUserDetails);

  const [lockAvatarFlag, setLockAvatarFlag] = useState(true);
  const [lockHandleFlag, setLockHandleFlag] = useState(true);
  const [lockFirstNameFlag, setLockFirstNameFlag] = useState(true);
  const [lockLastNameFlag, setLockLastNameFlag] = useState(true);
  const [lockEmailFlag, setLockEmailFlag] = useState(true);

  const handleChange = (e) =>
    setInputData((curr) => ({ ...curr, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateUserDetails(inputData, authState.token); // updates both state and server
    lockForm();
  };

  const clearForm = () => {
    setInputData(userDetails);
    lockForm();
  };

  const lockForm = () => {
    setLockAvatarFlag(true);
    setLockHandleFlag(true);
    setLockFirstNameFlag(true);
    setLockLastNameFlag(true);
    setLockEmailFlag(true);
  };

  useEffect(() => {
    if (userDetails?._id) setInputData(userDetails);
  }, [userDetails]);

  const leftSm = 3;
  const leftLg = 2;
  const rightSm = 12 - leftSm;
  const rightLg = 12 - leftLg;

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="d-grid mt-2">
          <Image
            alt="avatar image"
            src={inputData.avatar}
            thumbnail
            style={{ maxHeight: "150px" }}
          />
          <div className="d-flex align-items-center h-100 mt-1">
            <Col sm={leftSm} lg={leftLg}>
              <span className="d-flex align-items-center h-100">
                <LockUnlockIcon
                  state={lockAvatarFlag}
                  setState={setLockAvatarFlag}
                  text="Modify avatar"
                />
                <Form.Label className="ps-1 m-0">Avatar:</Form.Label>
              </span>
            </Col>
            <Col sm={rightSm} lg={rightLg}>
              {!lockAvatarFlag && (
                <FileBase
                  type="file"
                  multiple={false}
                  onDone={({ base64 }) =>
                    setInputData((curr) => ({ ...curr, avatar: base64 }))
                  }
                />
              )}
            </Col>
          </div>
        </Form.Group>

        <Form.Group as={Row} className="mt-2">
          <Col sm={leftSm} lg={leftLg}>
            <span className="d-flex align-items-center h-100">
              <LockUnlockIcon
                state={lockHandleFlag}
                setState={setLockHandleFlag}
                text="Modify online handle"
              />
              <Form.Label className="ps-1 m-0">Handle:</Form.Label>
            </span>
          </Col>
          <Col sm={rightSm} lg={rightLg}>
            <Form.Control
              type="text"
              name="handle"
              placeholder="Online handle"
              value={inputData.handle}
              onChange={handleChange}
              disabled={lockHandleFlag}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mt-2">
          <Col sm={leftSm} lg={leftLg}>
            <span className="d-flex align-items-center h-100">
              <LockUnlockIcon
                state={lockFirstNameFlag}
                setState={setLockFirstNameFlag}
                text="Modify online handle"
              />
              <Form.Label className="ps-1 m-0">First Name:</Form.Label>
            </span>
          </Col>
          <Col sm={rightSm} lg={rightLg}>
            <Form.Control
              type="text"
              name="firstName"
              placeholder="First name"
              value={inputData.firstName}
              onChange={handleChange}
              disabled={lockFirstNameFlag}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mt-2">
          <Col sm={leftSm} lg={leftLg}>
            <span className="d-flex align-items-center h-100">
              <LockUnlockIcon
                state={lockLastNameFlag}
                setState={setLockLastNameFlag}
                text="Modify online handle"
              />
              <Form.Label className="ps-1 m-0">Last Name:</Form.Label>
            </span>
          </Col>
          <Col sm={rightSm} lg={rightLg}>
            <Form.Control
              type="text"
              name="lastName"
              placeholder="Last name"
              value={inputData.lastName}
              onChange={handleChange}
              disabled={lockLastNameFlag}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mt-2">
          <Col sm={leftSm} lg={leftLg}>
            <span className="d-flex align-items-center h-100">
              <LockUnlockIcon
                state={lockEmailFlag}
                setState={setLockEmailFlag}
                text="Modify online handle"
              />
              <Form.Label className="ps-1 m-0">Email:</Form.Label>
            </span>
          </Col>
          <Col sm={rightSm} lg={rightLg}>
            <Form.Control
              type="email"
              name="email"
              placeholder="Email"
              value={inputData.email}
              onChange={handleChange}
              disabled={lockEmailFlag}
            />
          </Col>
        </Form.Group>

        <Button variant="primary" type="submit" className="mt-2 me-2">
          Save changes
        </Button>
        <Button
          variant="secondary"
          type="button"
          onClick={() => clearForm()}
          className="mt-2"
        >
          Clear changes
        </Button>
      </Form>
    </>
  );
};

export default ProfileForm;
