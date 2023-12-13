import React from "react";
import {Row} from "react-bootstrap"

import FriendCard from "./FriendCard";
import FriendSearch from "./FriendSearch";
import { useSearchDetails } from "../../hooks";

const ExtendedFriendSearch = () => {
  const { userSearchList } = useSearchDetails();

  return <Row className="">
    <FriendSearch/>
    <hr/>
  {userSearchList.map((friendInfo) => {
    return <FriendCard key={`friend-card-${friendInfo.userID}`} friendInfo={friendInfo}/>
  })}
  </Row>
};

export default ExtendedFriendSearch;
