import { useState } from "react";

// import axios from "axios";

import { useAuthContext, useUserContext, useUserDetails } from "./";
import AUTH_TYPES from "../constants/types/authTypes";
import USER_TYPES from "../constants/types/userTypes";

import { logIn } from "../actions/auth";

const useLogin = () => {
  const [error, setError] = useState(null);
  const [loadingFlag, setLoadingFlag] = useState(null);
  const { dispatch: authDispatch } = useAuthContext();
  const { dispatch: userDispatch } = useUserContext();
  const { getUserDetails } = useUserDetails();

  const login = async (email, password) => {
    setLoadingFlag(true);
    setError(null);

    const authResponse = await logIn(email, password);

    const { data } = authResponse;

    if (authResponse.statusText !== "OK") {
      setError(authResponse.error);
      setLoadingFlag(false);
    } else {
      const { email, token } = data;
      localStorage.setItem(
        "digital-bookshelf-user",
        JSON.stringify({ email, token })
      ); // saves token data to local storage
      authDispatch({ type: AUTH_TYPES.LOGIN, payload: { email, token } }); // saves token data to state
      const userDetails = await getUserDetails(data.email); // gets user info
      userDispatch({ type: USER_TYPES.SET_USER_DETAILS, payload: userDetails }); // saves user data to state

      setLoadingFlag(false);
    }
  };

  return { login, loadingFlag, error };
};

export default useLogin;
