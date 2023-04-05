import React, { useState, useEffect } from "react";

import { Row, Image, Stack } from "react-bootstrap";

import {
  useGetFriendDetails,
  useUserDetails,
  useAuthDetails,
} from "../../hooks";
import RemoveFriendIcon from "../elements/RemoveFriendIcon";

const Pending = ({ friend }) => {
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
      {friend.friendStatus === "pending" && friendData && (
        <Stack direction="horizontal" gap={2}>
          <Image
            src={friendData.avatar || "https://picsum.photos/200"}
            height="50px"
            roundedCircle
          />
          <span className="ms-1">{friendData.handle}</span>
          {userDetails.userID && friend && authDetails.token ? (
            <RemoveFriendIcon
              userID={userDetails.userID}
              friendID={friend.friendUserID}
              token={authDetails.token}
            />
          ) : (
            <div />
          )}
        </Stack>
      )}
    </>
  );
};

export default Pending;
