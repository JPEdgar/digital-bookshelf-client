import React from "react";

import { Dropdown, Image, Stack } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import {
  useUserDetails,
  useUserFriendsList,
  useAuthDetails,
  useFriendDetails,
} from "../../hooks";

import AddFriendIcon from "./AddFriendIcon";
import RemoveFriendIcon from "./RemoveFriendIcon";
import BlockUserIcon from "./BlockUserIcon";
import AcceptFriendIcon from "./AcceptFriendIcon";

const UserSearchItem = ({ userData, setOpenSearchFlag }) => {
  const { getFriendStatus } = useUserFriendsList();
  const { userDetails } = useUserDetails();
  const { authDetails } = useAuthDetails();
  const { setFriendFocus } = useFriendDetails();
  const navigate = useNavigate();

  const isUserFlag = userData.userID === userDetails.userID ? true : false;

  const friendStatus = getFriendStatus(userData.userID);
  if (friendStatus.friendStatus === "blocked") return;

  const handleClick = () => {
    navigate("/friend-search");
    setFriendFocus(userData.userID);
    setOpenSearchFlag(false);
  };

  return (
    <Dropdown.Item
      onClick={() => handleClick()}
      style={{
        border: `${
          friendStatus.friendStatus === "pending"
            ? "1px solid green"
            : friendStatus.friendStatus === "friends"
            ? "1px solid blue"
            : ""
        }`,
        backgroundColor: `${isUserFlag ? "#F0F0F0" : ""}`,
      }}
    >
      <Stack direction="horizontal" gap={1}>
        <Image src="https://picsum.photos/100" height="50px" roundedCircle />
        <Stack className="ms-1">
          {userData.handle}
          {isUserFlag && <div style={{ fontSize: "0.85rem" }}>You</div>}
          {friendStatus.friendStatus === "pending" &&
            friendStatus.requestInboud && (
              <div style={{ fontSize: "0.85rem" }}>
                Pending - Approve request?
              </div>
            )}
          {friendStatus.friendStatus === "pending" &&
            !friendStatus.requestInboud && (
              <div style={{ fontSize: "0.85rem" }}>
                Pending - Awaiting their reply.
              </div>
            )}
          {friendStatus.friendStatus === "friends" && (
            <div style={{ fontSize: "0.85rem" }}>Friends</div>
          )}
        </Stack>

        {authDetails.email && (
          <Stack direction="horizontal" gap={1} className="ms-1">
            {friendStatus.friendStatus === "pending" &&
              !friendStatus.requestInboud && (
                <RemoveFriendIcon
                  userID={userDetails.userID}
                  friendID={userData.userID}
                  token={authDetails.token}
                />
              )}
            {friendStatus.friendStatus === "pending" &&
              friendStatus.requestInboud && (
                <AcceptFriendIcon
                  userID={userDetails.userID}
                  friendID={userData.userID}
                  token={authDetails.token}
                />
              )}
            {!isUserFlag && !friendStatus.friendStatus && (
              <AddFriendIcon
                userID={userDetails.userID}
                friendID={userData.userID}
                token={authDetails.token}
              />
            )}
            {!isUserFlag && (
              <BlockUserIcon
                userID={userDetails.userID}
                friendID={userData.userID}
                token={authDetails.token}
              />
            )}
          </Stack>
        )}
      </Stack>
    </Dropdown.Item>
  );
};

export default UserSearchItem;
