import { useState } from "react";

// import axios from "axios";

import { useAuthContext, useUserDetails } from "./";
import AUTH_TYPES from "../constants/authTypes";
// import USER_TYPES from "../constants/userTypes";

import { logIn } from "../actions/auth";

const useLogin = () => {
  const [error, setError] = useState(null);
  const [loadingFlag, setLoadingFlag] = useState(null);
  const { dispatch: authDispatch } = useAuthContext();
  const { setUserDetails } = useUserDetails();

  const login = async (email, password) => {
    setLoadingFlag(true);
    setError(null);

    const authResponse = await logIn(email, password);

    const { data } = authResponse;

    if (authResponse.statusText !== "OK") {
      setError(authResponse.error);
      setLoadingFlag(false);
    } else {
      localStorage.setItem("digital-bookshelf-user", JSON.stringify(data));
      authDispatch({ type: AUTH_TYPES.LOGIN, payload: { email: data.email, token: data.token }, });
      setUserDetails(data.userData);

      setLoadingFlag(false);
    }
  };

  return { login, loadingFlag, error };
};

export default useLogin;
