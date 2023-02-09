import { useState } from "react";

import { useAuthContext } from "./";
import AUTH_TYPES from "../constants/types/authTypes";

import { logIn } from "../actions/auth";

const useLogin = () => {
  const [error, setError] = useState(null);
  const [loadingFlag, setLoadingFlag] = useState(null);
  const { dispatch: authDispatch } = useAuthContext();

  const login = async (email, password) => {
    setLoadingFlag(true);
    setError(null);

    const authResponse = await logIn(email, password);
    if (!authResponse) {
      setError("No account found.");
      setLoadingFlag(false);
      return;
    }

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

      setLoadingFlag(false);
    }
  };

  return { login, loadingFlag, error };
};

export default useLogin;
