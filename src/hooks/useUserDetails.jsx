import React from "react";

import USER_TYPES from "../constants/userTypes";
import { useUserContext } from "./";
import {
  getUserDetails as getUserDetailsAction,
  setUserDetails as setUserDetailsAction,
} from "../actions/user";

const useUserDetails = () => {
  const { userDetails, dispatch: userDispatch } = useUserContext();

  const getUserDetails = async (email, getOnlineOverride = false) => {
    let userData = {};
    if (getOnlineOverride || !userDetails.id)
      userData = await getUserDetailsAction(email);
    else userData = { ...userDetails };
    return userData;
  };

  const setUserDetails = async (data) => {
    await setUserDetailsAction(data);
    userDispatch({ type: USER_TYPES.SET_USER_DETAILS, payload: data.userData });
  };

  return { getUserDetails, setUserDetails };
};

export default useUserDetails;
