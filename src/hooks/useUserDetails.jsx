import React from "react";

import USER_TYPES from "../constants/userTypes";
import { useUserContext } from "./";
import {
  getUserDetails as getUserDetailsAction,
  setNewUserDetails as setNewUserDetailsAction,
  updateUserDetails as updateUserDetailsAction,
} from "../actions/user";

const useUserDetails = () => {
  const { userDetails, dispatch: userDispatch } = useUserContext();

  const getUserDetails = async (email, getOnlineOverride = false) => {
    let userData;
    // console.log("in useUserDetails > getUserDetails, data = ", userDetails)
    if (getOnlineOverride || !userDetails.userID)
      userData = await getUserDetailsAction(email);
    else userData = userDetails;

    return userData;
  };

  const setNewUserDetails = async (data, token) => {
    await setNewUserDetailsAction(data, token);
    userDispatch({ type: USER_TYPES.SET_USER_DETAILS, payload: data });
  };

  const updateUserDetails = async (data, token) => {
    // console.log("in useUserDetails > updateUserDetails, {data,token} = ", {data, token})
    await updateUserDetailsAction(data, token);
    userDispatch({ type: USER_TYPES.SET_USER_DETAILS, payload: data });
  };

  return { userDetails, getUserDetails, setNewUserDetails, updateUserDetails };
};

export default useUserDetails;
