import React from "react";

import { Row, Col } from "react-bootstrap";

import Friend from "./Friend";
import Pending from "./Pending"
import FriendFocus from "./FriendFocus";
import { useUserDetails } from "../../hooks";

const Friends = () => {
  const { userDetails } = useUserDetails();

  // console.log(userDetails.friendsList)
  return (
    <>
      <Row>
        <Col xs={3}>
        <div>
            Friends:
        </div>
          {userDetails.friendsList &&
            userDetails.friendsList.map((friend) => (
              <Friend key={friend.friendUserID} friend={friend} />
            ))}
            <div>
                Pending:
            </div>
          {userDetails.friendsList &&
            userDetails.friendsList.map((friend) => (
              <Pending key={friend.friendUserID} friend={friend} />
            ))}
        </Col>
        <Col><FriendFocus/></Col>
      </Row>
    </>
  );
};

export default Friends;
