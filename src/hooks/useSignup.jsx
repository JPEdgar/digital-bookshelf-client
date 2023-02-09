import { useState } from "react";

import axios from "axios";

import { useAuthContext } from "./";

import AUTH_TYPES from "../constants/types/authTypes";

import { signUp } from "../actions/auth";

const useSignup = () => {
  const [error, setError] = useState(null);
  const [loadingFlag, setLoadingFlag] = useState(null);
  const { dispatch: authDispatch } = useAuthContext();

  const signup = async (email, password) => {
    setLoadingFlag(true);
    setError(null);

    const createUserDetails = (data) => {
      console.log("creating new user with email ", data);
      const { email, id, token } = data;
      const newUserDetails = axios.post(
        "http://localhost:4000/api/user",
        { email, id },
        { headers: { Authorization: `bearer ${token}` } }
      );

      return newUserDetails;
    };

    const createNewUserResponse = await signUp(email, password);
    if (createNewUserResponse.statusText !== "Created") {
      setLoadingFlag(false);
      setError(createNewUserResponse.error);
      return;
    }

    const createNewUserDetailsResponse = await createUserDetails(
      createNewUserResponse.data
    );
    console.log(
      "createNewUserDetailsResponse = ",
      createNewUserDetailsResponse
    );
    if (createNewUserDetailsResponse.statusText !== "Created") {
      console.log(
        "Problem creating new user details: ",
        createNewUserDetailsResponse
      );
      setLoadingFlag(false);
      setError(createNewUserDetailsResponse.error);
      return;
    }

    localStorage.setItem(
      "digital-bookshelf-user",
      JSON.stringify(createNewUserResponse.data)
    );
    authDispatch({
      type: AUTH_TYPES.SIGNUP,
      payload: createNewUserResponse.data,
    });

    setLoadingFlag(false);
  };

  return { signup, loadingFlag, error };
};

export default useSignup;
