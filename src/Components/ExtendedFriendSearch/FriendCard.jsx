import React from "react";
import { Card, Col } from "react-bootstrap";

import { useUserDetails } from "../../hooks";

const FriendCard = ({ friendInfo }) => {
  const { userDetails } = useUserDetails();

  const isUserFlag = userDetails.userID === friendInfo.userID ? true : false;
  const friendData = userDetails.friendsList.find(
    (x) => x.friendUserID === friendInfo.userID
  );

  let friendStatus = null;
  if (friendData) friendStatus = friendData.friendStatus;

  return (
    !isUserFlag && (
      <Col xs={12} sm={6} md={4} className="my-2" style={{ maxWidth: "18rem" }}>
        <Card>
          <Card.Img variant="top" src={friendInfo.avatar} />
          <Card.Body>
            <Card.Title>{friendInfo.handle}</Card.Title>
            {friendStatus === "friends" && <Card.Text>friends</Card.Text>}
            {friendStatus === "pending" && <Card.Text>pending</Card.Text>}
            {!friendStatus && <Card.Text>unfriended</Card.Text>}
          </Card.Body>
        </Card>
      </Col>
    )
  );
};

export default FriendCard;
