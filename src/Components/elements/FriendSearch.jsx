import React, { useEffect, useState } from "react";

import { Form, Dropdown, Row, Col, Image, Stack } from "react-bootstrap";

import {
  useFindFriend,
  useUserDetails,
  useUserFriendsList,
  useAuthDetails,
} from "../../hooks";

import AddFriendIcon from "./AddFriendIcon";
import RemoveFriendIcon from "./RemoveFriendIcon";
import BlockUserIcon from "./BlockUserIcon";

const FriendSearch = () => {
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [openSearchFlag, setOpenSearchFlag] = useState(false);
  const { findFriend } = useFindFriend();
  const { getFriendStatus } = useUserFriendsList();
  const { userDetails } = useUserDetails();
  const { authDetails } = useAuthDetails();

  const timeoutDelay = 1000;

  const handleChange = (e) => setSearchValue(e.target.value);

  const handleClick = () => setOpenSearchFlag(false);

  const toggleShow = () => {
    if (searchValue) setOpenSearchFlag((curr) => !curr);
  };

  const Friend = ({ friendData }) => {
    const isUserFlag = friendData.userID === userDetails.userID ? true : false;

    const friendStatus = getFriendStatus(friendData.userID);
    if (friendStatus === "blocked") return;

    return (
      <Dropdown.Item
        onClick={() => handleClick()}
        style={{
          border: `${
            friendStatus === "pending"
              ? "1px solid green"
              : friendStatus === "friends"
              ? "1px solid blue"
              : ""
          }`,
          backgroundColor: `${isUserFlag ? "#F0F0F0" : ""}`,
        }}
      >
        <Stack direction="horizontal" gap={1}>
          <Image src="https://picsum.photos/100" height="50px" roundedCircle />
          <div className="ms-1">
            {friendData.handle}
            {isUserFlag && <div style={{ fontSize: "0.85rem" }}>You</div>}
            {friendStatus === "pending" && (
              <div style={{ fontSize: "0.85rem" }}>Pending</div>
            )}
            {friendStatus === "friends" && (
              <div style={{ fontSize: "0.85rem" }}>Friends</div>
            )}
          </div>

          <Stack direction="horizontal" gap={1}>
            <div className="ms-auto">
              {friendStatus === "pending" || friendStatus === "friends" ? (
                <RemoveFriendIcon
                  userID={userDetails.userID}
                  friendID={friendData.userID}
                  token={authDetails.token}
                />
              ) : (
                <AddFriendIcon
                  userID={userDetails.userID}
                  friendID={friendData.userID}
                  token={authDetails.token}
                />
              )}
            </div>
            <BlockUserIcon
              userID={userDetails.userID}
              friendID={friendData.userID}
              token={authDetails.token}
            />
          </Stack>
        </Stack>
      </Dropdown.Item>
    );
  };

  useEffect(() => {
    if (!searchValue.length) {
      setSearchResults([]);
      return;
    }
    const timer = setTimeout(async () => {
      const { users } = await findFriend(searchValue);
      setSearchResults(users);
    }, timeoutDelay);
    return () => clearTimeout(timer);
  }, [searchValue]);

  useEffect(() => {
    if (searchResults.length <= 0) setOpenSearchFlag(false);
    else setOpenSearchFlag(true);
  }, [searchResults]);

  return (
    <>
      <Dropdown show={openSearchFlag} onBlur={() => setOpenSearchFlag(false)}>
        {/* <Dropdown.Toggle variant="success" id="dropdown-basic">
          Dropdown Button
        </Dropdown.Toggle> */}
        <Form>
          <Form.Control
            type="text"
            placeholder="Search for friends"
            onChange={handleChange}
            value={searchValue}
            onClick={() => toggleShow()}
          />
        </Form>
        <Dropdown.Menu>
          {searchResults.map((friendData, index) => (
            <Friend
              key={`friend-search-results-${index}`}
              friendData={friendData}
            />
          ))}
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
};

export default FriendSearch;
