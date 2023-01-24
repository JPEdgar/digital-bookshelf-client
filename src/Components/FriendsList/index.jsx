import React from "react";

import FriendsListCard from "./FriendsListCard";

import { useUserDetails } from "../../hooks";

const FriendsList = () => {
  const { userDetails } = useUserDetails();

  const { pendingFriendsList } = userDetails;

  return (
    <>
      {pendingFriendsList.length > 0 &&
        pendingFriendsList.map((friendID, index) => (
          <FriendsListCard
            key={`pending-friend-card-${index}`}
            friendID={friendID}
          />
        ))}
    </>
  );
};

export default FriendsList;
