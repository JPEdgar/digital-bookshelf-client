import React, { useEffect, useState } from "react";

import { Form, Dropdown, Row, Col, Image, Stack } from "react-bootstrap";

import {
  useFindFriend,
  useUserDetails,
  useUserFriendsList,
  useAuthDetails, useSearchDetails
} from "../../hooks";

import AddFriendIcon from "./AddFriendIcon";
import RemoveFriendIcon from "./RemoveFriendIcon";
import BlockUserIcon from "./BlockUserIcon";
import AcceptFriendIcon from "./AcceptFriendIcon";
import ShowMoreIcon from "./ShowMoreIcon";

const UserSearch = () => {
  const [inDropdownFlag, setInDropdownFlag] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  // const [searchResults, setSearchResults] = useState([]);
  const [openSearchFlag, setOpenSearchFlag] = useState(false);
  const { findFriend } = useFindFriend();
  const { getFriendStatus } = useUserFriendsList();
  const { userDetails } = useUserDetails();
  const { authDetails } = useAuthDetails();
  const {userSearchList, updateUserSearch, clearUserSearch} = useSearchDetails()

  const timeoutDelay = 1000;

  const handleChange = (e) => setSearchValue(e.target.value);

  const handleClick = () => setOpenSearchFlag(false);

  const handleBlur = () => {
    if (!inDropdownFlag) setOpenSearchFlag(false);
  };

  const toggleShow = () => {
    if (searchValue) setOpenSearchFlag((curr) => !curr);
  };

  const User = ({ userData }) => {
    const isUserFlag = userData.userID === userDetails.userID ? true : false;

    const friendStatus = getFriendStatus(userData.userID);
    if (friendStatus.friendStatus === "blocked") return;

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
        </Stack>
      </Dropdown.Item>
    );
  };

  useEffect(() => {
    if (!searchValue.length) {
      clearUserSearch()
      return;
    }
    const timer = setTimeout(async () => {
      const { users } = await findFriend(searchValue);
      console.log("users = ", users);
      updateUserSearch(users);
    }, timeoutDelay);
    return () => clearTimeout(timer);
  }, [searchValue]);

  useEffect(() => {
    if (userSearchList.length <= 0) setOpenSearchFlag(false);
    else setOpenSearchFlag(true);
  }, [userSearchList]);

  return (
    <>
      <Dropdown
        show={openSearchFlag}
        onBlur={() => handleBlur()}
        onMouseEnter={() => setInDropdownFlag(true)}
        onMouseLeave={() => setInDropdownFlag(false)}
        className="d-none d-md-flex"
      >
        <Form onSubmit={(e) => e.preventDefault()}>
          <Form.Control
            type="text"
            placeholder="Search for friends"
            onChange={handleChange}
            value={searchValue}
            onClick={() => toggleShow()}
          />
        </Form>
        <Dropdown.Menu>
          {userSearchList.map((userData, index) => (
            <User
              key={`friend-search-results-${index}`}
              userData={userData}
            />
            ))}
            <ShowMoreIcon loc="/friend-search" setToggleDropdownFlag={() => setOpenSearchFlag()}/>
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
};

export default UserSearch;
