import {
  sendFriendRequest as sendFriendRequestAction,
  acceptFriendRequest as acceptFriendRequestAction,
} from "../actions/user";

import USER_TYPES from "../constants/types/userTypes";
import useUserContext from "./context/useUserContext"; // refactor to useUser hook aaaaaaaaaa

import { useUserDetails } from "./";

const useAddFriend = () => {
  const { dispatch: userDispatch } = useUserContext();
  const { userDetails } = useUserDetails();

  const addFriend = async (userID, friendID) => {
    const isFriendFlag = userDetails.friendsList.find(
      (x) => x.friendUserID === friendID
    );

    let returnData;

    if (!isFriendFlag) {
      const { data } = await sendFriendRequestAction(userID, friendID);
      const { userFriendsList } = data;
      returnData = userFriendsList;
      userDispatch({
        type: USER_TYPES.ADD_FRIEND,
        payload: userFriendsList,
      });
    } else if (isFriendFlag) {
      const { data } = await acceptFriendRequestAction(userID, friendID);
      const { updatedUserObject } = data;
      returnData = updatedUserObject;
      userDispatch({
        type: USER_TYPES.ADD_FRIEND,
        payload: updatedUserObject.friendsList,
      });
    }

    return returnData;
  };

  return { addFriend };
};

export default useAddFriend;
