import { useState } from "react";

import useAuthContext from "./context/useAuthContext";
import useUserContext from "./context/useUserContext";

import AUTH_TYPES from "../constants/types/authTypes";

import { logIn } from "../actions/auth";
import { getUserDetails } from "../actions/user";
import USER_TYPES from "../constants/types/userTypes";

const useLogin = () => {
  const [error, setError] = useState(null);
  const [loadingFlag, setLoadingFlag] = useState(null);
  const { dispatch: authDispatch } = useAuthContext();
  const { dispatch: userDispatch } = useUserContext();

  const login = async (email, password) => {
    setLoadingFlag(true);
    setError(null);

    const authResponse = await logIn(email, password);
    if (!authResponse) {
      setError("No account found.");
      setLoadingFlag(false);
      return;
    }

    const userInfoResponse = await getUserDetails({ email });
    if (!userInfoResponse) {
      setError("No user found.");
      setLoadingFlag(false);
      return;
    }

    const { data: authData } = authResponse;
    const { data: userData } = userInfoResponse;

    if (authResponse.statusText !== "OK") {
      setError(authResponse.error);
      setLoadingFlag(false);
    } else {
      const { email, token } = authData;
      localStorage.setItem( "digital-bookshelf-user", JSON.stringify({ email, token }) ); // saves token data to local storage
      authDispatch({ type: AUTH_TYPES.LOGIN, payload: { email, token } }); // saves token data to state
      userDispatch({ type: USER_TYPES.SET_USER, payload: userData });

      setLoadingFlag(false);
    }
  };

  return { login, loadingFlag, error };
};

export default useLogin;
