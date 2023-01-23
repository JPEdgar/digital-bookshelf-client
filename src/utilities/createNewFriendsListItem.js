const createNewFriendsListItem = (friendID) => {
  return {
    friendID,
    status: "pending",
  };
};

export default createNewFriendsListItem;
