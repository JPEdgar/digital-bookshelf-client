import React from "react";
import {Row} from "react-bootstrap"

import FriendCard from "./FriendCard";
import { useSearchDetails } from "../../hooks";

const ExtendedFriendSearch = () => {
  const { userSearchList } = useSearchDetails();

  return <Row className="">
  {userSearchList.map((friendInfo) => {
    return <FriendCard key={`friend-card-${friendInfo.userID}`} friendInfo={friendInfo}/>
  })}
  </Row>
};

export default ExtendedFriendSearch;
