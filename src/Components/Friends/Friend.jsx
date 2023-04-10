import React, { useState, useEffect } from "react";

import { Row, Image, Stack } from "react-bootstrap";

import { useUserDetails, useAuthDetails, useFriendDetails } from "../../hooks";
import RemoveFriendIcon from "../elements/RemoveFriendIcon";

const Friend = ({ friend }) => {
  const [friendData, setFriendData] = useState(null);
  const { userDetails } = useUserDetails();
  const { authDetails } = useAuthDetails();
  const { getFriendDetails, setFriendFocus } = useFriendDetails();

  const handleClick = () => {
    setFriendFocus(friendData.userID);
  };

  useEffect(() => {
    const getData = async () => {
      const data = await getFriendDetails({ userID: friend?.friendUserID });
      setFriendData(data);
    };
    getData();
  }, []);

  return (
    <>
      {friend.friendStatus === "friends" && friendData && (
        <Stack direction="horizontal" gap={2}>
          <Image
            src={friendData.avatar || "https://picsum.photos/200"}
            height="50px"
            roundedCircle
            style={{ cursor: "crosshair" }}
            onClick={() => handleClick()}
          />
          <span
            className="ms-1 w-100"
            style={{ cursor: "crosshair" }}
            onClick={() => handleClick()}
          >
            {friendData.handle}
          </span>
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

export default Friend;
