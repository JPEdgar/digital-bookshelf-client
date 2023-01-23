import React from "react";

import axios from "axios";
import { Row, Col, Card, Button } from "react-bootstrap";

import { useUserDetails, useAuthContext } from "../../hooks";

import { updateUserDetails } from "../../actions/user";
import { createNewFriendsListItem } from "../../utilities";

const SearchResults = ({ result, setSearchResults }) => {
  const { userDetails } = useUserDetails();
  const { authState } = useAuthContext();

  const isUserFlag = userDetails._id === result._id ? true : false;
  // const friendsList = userDetails.friendsList;
  // const friendData = friendsList.find((friend) => result._id === friend.userID);

  const handleClick = async () => {
    const friendID = result.userID;

    const userFriendsList = [...userDetails.friendsList];
    const friendDetails = userFriendsList.find((x) => x.userID === friendID);
    console.log("friendDetails = ", friendDetails);

    // send friend request
    if (!friendDetails) {
      await axios.patch(
        `http://localhost:4000/api/user/friend-request/${friendID}`,
        { friendInfo: result, userID: userDetails.userID }
      );

      if (result.pendingFriendsList.includes(userDetails.userID))
        console.log("Friend already pending");
      else {
        setSearchResults((curr) => {
          const updatedPendingList = [...curr.pendingFriendsList];
          updatedPendingList.push(userDetails.userID);
          return { ...curr, pendingFriendsList: updatedPendingList };
        });
      }

      // update user's friend list to include a pending friend
      userFriendsList.push(createNewFriendsListItem(friendID));
      const updatedUserInfo = {...userDetails,friendsList: userFriendsList }
      await updateUserDetails(
        updatedUserInfo,
        authState.token
      ); // updates both state and server
    }
    return;
  };

  return (
    <div>
      {result && (
        <Card style={{ width: "18rem", border: "2px solid red" }}>
          <Card.Img variant="top" src={result.avatar} />
          <Card.Body>
            <Card.Title>
              {result.handle}
              {isUserFlag ? " (you)" : ""}
            </Card.Title>
            <Card.Text>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </Card.Text>
            {!isUserFlag && (
              <Button variant="primary" onClick={() => handleClick()}>
                Test friend
              </Button>
            )}
          </Card.Body>
        </Card>
      )}
    </div>
  );
};

export default SearchResults;
