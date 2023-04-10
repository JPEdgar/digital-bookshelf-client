import React, { useState, useEffect } from "react";

import { Row, Image, Stack } from "react-bootstrap";

import {
  useFriendDetails,
  useUserDetails,
  useAuthDetails,
  useUserFriendsList,
} from "../../hooks";
import RemoveFriendIcon from "../elements/RemoveFriendIcon";
import BlockUserIcon from "../elements/BlockUserIcon";
import AddFriendIcon from "../elements/AddFriendIcon";
import AcceptFriendIcon from "../elements/AcceptFriendIcon";

const Pending = ({ friend }) => {
  const [friendData, setFriendData] = useState(null);
  const { getFriendDetails, setFriendFocus } = useFriendDetails();
  const { userDetails } = useUserDetails();
  const { authDetails } = useAuthDetails();
  const { getFriendStatus } = useUserFriendsList();

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

  const friendStatus = getFriendStatus(friendData?.userID);
  if (friendStatus.friendStatus === "blocked") return;

  return (
    <>
      {friend.friendStatus === "pending" && friendData && (
        <Stack direction="horizontal" gap={2}>
          <Image
            src={friendData?.avatar || "https://picsum.photos/200"}
            height="50px"
            roundedCircle
            style={{ cursor: "crosshair" }}
            onClick={() => handleClick()}
          />

          <Stack style={{ cursor: "crosshair" }} onClick={() => handleClick()}>
            <span className="ms-1 w-100">{friendData?.handle}</span>
            {friendStatus.friendStatus === "pending" &&
              friendStatus.requestInboud && (
                <div className="ms-1" style={{ fontSize: "0.85rem" }}>
                  Pending - Approve request?
                </div>
              )}
            {friendStatus.friendStatus === "pending" &&
              !friendStatus.requestInboud && (
                <div className="ms-1" style={{ fontSize: "0.85rem" }}>
                  Pending - Awaiting their reply.
                </div>
              )}
          </Stack>

          <Stack direction="horizontal" gap={2}>
            {userDetails.userID && friend && authDetails.token && (
              <>
                {friendStatus.requestInboud && (
                  <AcceptFriendIcon
                    userID={userDetails.userID}
                    friendID={friend.friendUserID}
                    token={authDetails.token}
                  />
                )}
                <RemoveFriendIcon
                  userID={userDetails.userID}
                  friendID={friend.friendUserID}
                  token={authDetails.token}
                />
              </>
            )}
            <BlockUserIcon />
          </Stack>
        </Stack>
      )}
    </>
  );
};

export default Pending;
