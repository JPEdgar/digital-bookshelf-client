import React from "react";

import { Form, Button } from "react-bootstrap";

const ProfileForm = () => {
  return (
    <>
      <Form>
        <Form.Group>
          <Form.Label>Handle:</Form.Label>
          <Form.Control type="text" placeholder="Online handle" />
        </Form.Group>
        <Form.Group>
          <Form.Label>First Name:</Form.Label>
          <Form.Control type="text" placeholder="First name" />
        </Form.Group>
        <Form.Group>
          <Form.Label>Last Name:</Form.Label>
          <Form.Control type="text" placeholder="Last name" />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
};

export default ProfileForm;
