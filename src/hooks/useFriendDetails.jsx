import { getUserDetails } from "../actions/user";

import useUserContext from "../hooks/context/useUserContext";
import USER_TYPES from "../constants/types/userTypes";
import { emailValidReg } from "../utilities";

const useFriendDetails = () => {
  const { dispatch: userDispatch } = useUserContext();

  const getFriendDetails = async (userID) => {
    const { data } = await getUserDetails(userID);
    return data;
  };

  const setFriendFocus = async (query) => {
    const isEmailFlag = query.search(emailValidReg) < 0 ? false : true;

    let responseData;
    if (isEmailFlag) responseData = await getUserDetails({ email: query });
    else responseData = await getUserDetails({ userID: query });

    const { data } = responseData;
    userDispatch({ type: USER_TYPES.SET_FRIEND_FOCUS, payload: data });

    // console.log("data = ", data)
  };

  return { getFriendDetails, setFriendFocus };
};

export default useFriendDetails;
