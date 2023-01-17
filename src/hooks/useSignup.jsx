import { useState } from "react";

import axios from "axios";

import { useAuthContext } from "../hooks";
import AUTH_TYPES from "../constants/authTypes";

const useSignup = () => {
  const [error, setError] = useState(null);
  const [loadingFlag, setLoadingFlag] = useState(null);
  const { dispatch } = useAuthContext();

  const signup = async (email, password) => {
    setLoadingFlag(true);
    setError(null);

    const response = await axios.post("http://localhost:4000/api/auth/signup", {
      email,
      password,
    });
    const { data } = response;

   
    if (response.statusText !== "OK") {
      setLoadingFlag(false);
      setError(response.error);
    } else {
      localStorage.setItem("user", JSON.stringify(data));
      dispatch({ type: AUTH_TYPES.SIGNUP, payload: data });

      setLoadingFlag(false);
    }
  };
  return { signup, loadingFlag, error };
};

export default useSignup;
