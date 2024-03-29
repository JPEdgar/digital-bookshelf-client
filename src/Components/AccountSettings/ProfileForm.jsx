import React, { useState, useEffect } from "react";

import { Form, Button, Image, Row, Col } from "react-bootstrap";
import FileBase from "react-file-base64";

import { useUserDetails, useAuthDetails } from "../../hooks";
// import { useUserDetails, useAuthContext } from "../../hooks";
// import initializeUserDetails from "../../constants/initializations/initializeUserDetails";
// import defaultUserDetails from "../../constants/initializations/initializeUserDetails";

import LockUnlockIcon from "../elements/LockUnlockIcon";

const ProfileForm = () => {
  const {
    userDetails,
    error, setError,
    loadingFlag,
    updateUserEmail, // email, password, newEmail, token
    updateUserPassword, // email, password, newPassword, token
    updateUserDetails, // updates, token
  } = useUserDetails();
  const { authDetails } = useAuthDetails();
  const [inputData, setInputData] = useState({ ...userDetails, password: "", newPassword: "" });
  const [lockEmailFlag, setLockEmailFlag] = useState(true);
  const [lockPasswordFlag, setLockPasswordFlag] = useState(true);

  const handleChange = (e) =>
    setInputData((curr) => ({ ...curr, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("inputData = ", inputData)
    const { email, password } = inputData;
    const { token } = authDetails;

    if (userDetails.email !== email) updateUserEmail(userDetails.email, password, email, token);

    if (inputData.newPassword) updateUserPassword(userDetails.email, inputData.password, inputData.newPassword, token)

    setLockEmailFlag(true)
    setLockPasswordFlag(true)
  };

  const resetInput = () => {
    setInputData({ ...userDetails, password: "", newPassword: "" })
  }

  const clearForm = () => {
    resetInput()
    setLockEmailFlag(true)
    setLockPasswordFlag(true)
    setError(null)
  };



  // temp, will probably create a separate component for form
  const leftSm = 3;
  const leftLg = 2;
  const rightSm = 12 - leftSm;
  const rightLg = 12 - leftLg;

  // useEffect(() => console.log(inputData), [inputData]);

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
                {/* <LockUnlockIcon state={lockAvatarFlag} setState={setLockAvatarFlag} text="Modify avatar" /> */}
                <Form.Label className="ps-1 m-0">Avatar:</Form.Label>
              </span>
            </Col>
            <Col sm={rightSm} lg={rightLg}>
              {/* {!lockAvatarFlag && ( <FileBase type="file" multiple={false} onDone={({ base64 }) => setInputData((curr) => ({ ...curr, avatar: base64 })) } /> )} */}
            </Col>
          </div>
        </Form.Group>

        <Form.Group as={Row} className="mt-2">
          <Col sm={leftSm} lg={leftLg}>
            <span className="d-flex align-items-center h-100">
              {/* <LockUnlockIcon state={lockHandleFlag} setState={setLockHandleFlag} text="Modify online handle" /> */}
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
              // disabled={lockHandleFlag}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mt-2">
          <Col sm={leftSm} lg={leftLg}>
            <span className="d-flex align-items-center h-100">
              {/* <LockUnlockIcon state={lockFirstNameFlag} setState={setLockFirstNameFlag} text="Modify first name" /> */}
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
              // disabled={lockFirstNameFlag}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mt-2">
          <Col sm={leftSm} lg={leftLg}>
            <span className="d-flex align-items-center h-100">
              {/* <LockUnlockIcon state={lockLastNameFlag} setState={setLockLastNameFlag} text="Modify last name" /> */}
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
              // disabled={lockLastNameFlag}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mt-2">
          <Col sm={leftSm} lg={leftLg}>
            <span className="d-flex align-items-center h-100">
              <LockUnlockIcon
                state={lockEmailFlag}
                setState={setLockEmailFlag}
                text="Modify email"
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

        <Form.Group as={Row} className="mt-2">
          <Col sm={leftSm} lg={leftLg}>
            <span className="d-flex align-items-center h-100">
              <LockUnlockIcon
                state={lockPasswordFlag}
                setState={setLockPasswordFlag}
                text="Modify Password"
              />
              <Form.Label className="ps-1 m-0">New Password:</Form.Label>
            </span>
          </Col>
          <Col sm={rightSm} lg={rightLg}>
            <Form.Control
              type="text"
              name="newPassword"
              placeholder="New password"
              value={inputData.newPassword}
              onChange={handleChange}
              disabled={lockPasswordFlag}
            />
          </Col>
        </Form.Group>

        {(!lockEmailFlag || !lockPasswordFlag) && (
          <Form.Group as={Row} className="mt-2">
            <Col sm={leftSm} lg={leftLg}>
              <span className="d-flex align-items-center h-100">
                <Form.Label className="ps-1 m-0">Re-enter Password:</Form.Label>
              </span>
            </Col>
            <Col sm={rightSm} lg={rightLg}>
              <Form.Control
                type="text"
                name="password"
                placeholder="Re-enter password to confirm changes"
                value={inputData.password}
                onChange={handleChange}
              />
            </Col>
          </Form.Group>
        )}

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
        {error && <div>{error}</div>}
      </Form>
    </>
  );
};

export default ProfileForm;

/*
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
    // bug with updating
    if (userDetails?._id && inputData.email !== userDetails.email)
      setInputData(userDetails);
    else setInputData(initializeUserDetails());
  }, []);

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
                text="Modify first name"
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
                text="Modify last name"
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
                text="Modify email"
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
  */
