import { removeFriend as removeFriendAction } from "../actions/user";

import USER_TYPES from "../constants/types/userTypes";
import useUserContext from "./context/useUserContext"; // refactor to useUser hook aaaaaaaaaa

const useRemoveFriend = () => {
  const { dispatch: userDispatch } = useUserContext();
  
  const removeFriend = async (userID, friendID) => {
    const { data: removedFriendDetails } = await removeFriendAction(userID, friendID);
    console.log("removedFriendDetails = ", removedFriendDetails.updatedFriend.userID);
    userDispatch({
      type: USER_TYPES.UPDATE_FRIENDS_LIST,
      payload: removedFriendDetails.updatedFriend.userID,
    });
    return removedFriendDetails;
  };

  return { removeFriend };
};

export default useRemoveFriend;
