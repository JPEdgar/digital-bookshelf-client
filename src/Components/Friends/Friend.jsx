import React, { useState, useEffect } from "react";

import { Row, Image } from "react-bootstrap";

import {
  useGetFriendDetails,
  useUserDetails,
  useAuthDetails,
} from "../../hooks";
import RemoveFriendIcon from "../elements/RemoveFriendIcon";

const Friend = ({ friend }) => {
  const [friendData, setFriendData] = useState(null);
  const { getFriendDetails } = useGetFriendDetails();
  const { userDetails } = useUserDetails();
  const { authDetails } = useAuthDetails();

  // console.log("pending details = ", { friend, userDetails, authDetails });
  useEffect(() => {
    // get friend data
    const getData = async () => {
      const data = await getFriendDetails({ userID: friend?.friendUserID });
      setFriendData(data);
    };
    getData();
  }, []);
  return (
    <>
      {friend.friendStatus === "friends" && friendData && (
        <div className="my-2 d-flex align-items-center justify-content-between">
          <div>
            <Image
              src={friendData.avatar || "https://picsum.photos/200"}
              height="50px"
              roundedCircle
            />
            <span className="ms-1">{friendData.handle}</span>
          </div>
          {userDetails.userID && friend && authDetails.token && (
            <RemoveFriendIcon
              userID={userDetails.userID}
              friendID={friend.friendUserID}
              token={authDetails.token}
            />
          )}
        </div>
      )}
    </>
  );
};

export default Friend;
