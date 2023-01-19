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
    return
    let userData;
    console.log("useUserDetail hook, userDetails = ", userDetails._id);
    if (getOnlineOverride) {
      console.log("useUserDetail hook, override = true");
      userData = await getUserDetailsAction(email);
      // console.log("userData = ", userData);
    }
    else if (!userDetails.id) {
      console.log("useUserDetail hook, userDetails has no id");
      userData = await getUserDetailsAction(email);
      // console.log("userData = ", userData);
    } else {
      // console.log("useUserDetail hook, userData should = userDetails");
      userData = await { ...userDetails };
      // console.log("userData = ", userData);
    }
    // console.log("useUserDetail hook, userData = ", userData);
    return userData;
  };

  const setUserDetails = async (data, token) => {
    // console.log("data = ", data)
    await setUserDetailsAction(data, token);
    userDispatch({ type: USER_TYPES.SET_USER_DETAILS, payload: data });
  };

  return { userDetails, getUserDetails, setUserDetails };
};

export default useUserDetails;
