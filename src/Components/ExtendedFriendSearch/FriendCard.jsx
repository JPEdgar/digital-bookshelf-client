import React from "react";
import { Card, Col } from "react-bootstrap";

const FriendCard = ({ friendInfo }) => {
  console.log(friendInfo);
  return (
    <Col xs={12} sm={6} md={4} className="my-2" style={{ maxWidth: '18rem' }}>
      <Card>
        <Card.Img variant="top" src={friendInfo.avatar} />
        <Card.Body>
          <Card.Title>{friendInfo.handle}</Card.Title>
          <Card.Text>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default FriendCard;
