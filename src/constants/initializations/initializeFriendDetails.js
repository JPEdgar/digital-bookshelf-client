const defaultFriendDetails = () => {
    return {
      userID: "",
      email: "",
      friendStatus: {
        requestPending: false, // user sent friend request
        requestReceived: false, // someone sent friend request to user
        friend: false, // friend request confirmed
      },
      sharedBooks: []
    };
  };
  
  export default defaultFriendDetails;
  