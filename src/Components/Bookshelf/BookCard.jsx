import React from "react";

import { Card, Col } from "react-bootstrap";

import { createAuthorString } from "../../utilities";

const BookCard = ({ image, title, subtitle, authors }) => {
  return (
    <Col xs={12} sm={6} md={4} lg={3} className="p-1">
      <Card>
        <Card.Img variant="top" src={image} alt={`${title} cover`} />
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          {subtitle && <Card.Title>{subtitle}</Card.Title>}
          <Card.Text>By: {createAuthorString(authors)}</Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default BookCard;
