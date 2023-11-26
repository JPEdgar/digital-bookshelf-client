import React, { useEffect, useState } from "react";

import { Form, Dropdown, Row, Col, Image, Stack } from "react-bootstrap";

import FilterIcon from "./FilterIcon";
import UserSearchItem from "./UserSearchItem"

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
        <Form onSubmit={(e) => e.preventDefault()} className="d-flex align-items-center">
          <Form.Control
            type="text"
            placeholder="Search for friends"
            onChange={handleChange}
            value={searchValue}
            onClick={() => toggleShow()}
          />
          <FilterIcon filterOption="friend-search" setOpenSearchFlag={setOpenSearchFlag}/>
        </Form>
        <Dropdown.Menu>
          {userSearchList.map((userData, index) => (
            <UserSearchItem
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
