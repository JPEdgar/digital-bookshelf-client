import { getFriendsList as getFriendsListAction } from "../actions/social";
import { useUserDetails } from "./index";

const useUserFriendsList = () => {
  const { userDetails } = useUserDetails();

  // temp?  userDetails has a friends list attached to obejct.  Maybe use this as a refresh?
  const getFriendsList = async () => {
    // const { data } = await getFriendsListAction(userDetails.userID);
    // return data;
  };

  const getFriendStatus = (friendID) => {
    const status = userDetails.friendsList.find(
      (x) => x.friendUserID === friendID
    );
    return status?.friendStatus;
  };

  return { getFriendsList, getFriendStatus };
};

export default useUserFriendsList;
