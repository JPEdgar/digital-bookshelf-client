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
    const isFriendFlag = userDetails.friendsList.find( (x) => x.friendUserID === friendID );

    let returnData;

    if (!isFriendFlag) {
      console.log("sending friend request")
      const { data } = await sendFriendRequestAction(userID, friendID);
      const { userFriendsList } = data;
      returnData = userFriendsList;
      userDispatch({ type: USER_TYPES.ADD_FRIEND, payload: userFriendsList, });
    } else if (isFriendFlag) {
      console.log("accepting friend request")
      const { data } = await acceptFriendRequestAction(userID, friendID);
      const { updatedUser } = data;
      returnData = updatedUser;
      // console.log(data)
      userDispatch({ type: USER_TYPES.ACCEPT_FRIEND_REQUEST, payload: friendID });

      // await acceptFriendRequestAction(userID, friendID);
      // userDispatch({ type: USER_TYPES.ADD_FRIEND, payload: friendID });
    }

    return returnData;
  };

  return { addFriend };
};

export default useAddFriend;
