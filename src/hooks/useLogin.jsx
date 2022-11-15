import { useState } from "react";

import axios from "axios";

import { useAuthContext } from "../hooks";
import AUTH_TYPES from "../constants/authTypes";

const useLogin = () => {
  const [error, setError] = useState(null);
  const [loadingFlag, setLoadingFlag] = useState(null);
  const { dispatch } = useAuthContext();

  const login = async (email, password) => {
    setLoadingFlag(true);
    setError(null);

    const response = await axios.post("http://localhost:4000/api/user/login", {
      email,
      password,
    });
    const { data } = response;

    if (response.statusText !== "OK") {
      setError(response.error);
      setLoadingFlag(false);
    } else {
      localStorage.setItem("user", JSON.stringify(data));
      dispatch({ type: AUTH_TYPES.LOGIN, payload: data });

      setLoadingFlag(false);
    }
  };
  return { login, loadingFlag, error };
};

export default useLogin;
