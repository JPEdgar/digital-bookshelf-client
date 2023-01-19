import { useState } from "react";

import axios from "axios";

import { useAuthContext, useUserContext, useUserDetails } from "./";

import AUTH_TYPES from "../constants/authTypes";
import USER_TYPES from "../constants/userTypes";

import { signUp } from "../actions/auth";

const useSignup = () => {
  const { setUserDetails } = useUserDetails();
  const [error, setError] = useState(null);
  const [loadingFlag, setLoadingFlag] = useState(null);
  const { dispatch: authDispatch } = useAuthContext();
  const { dispatch: userDispatch } = useUserContext();

  const signup = async (email, password) => {
    setLoadingFlag(true);
    setError(null);

    const createUserDetails = (data) => {
      const { email, id, token } = data;
      const newUserDetails = axios.post( "http://localhost:4000/api/user", { email, id }, { headers: { Authorization: `bearer ${token}` } } );
      return newUserDetails;
    };

    const createBookshelf = (data) => {
      const { id, token } = data;
      const newBookshelf = axios.post( "http://localhost:4000/api/bookshelf", { id }, { headers: { Authorization: `bearer ${token}` } } );
      return newBookshelf;
    };

    const createNewUserResponse = await signUp(email, password);
    if (createNewUserResponse.statusText !== "Created") {
      console.log("Problem creating new user: ", createNewUserResponse);
      setLoadingFlag(false);
      setError(createNewUserResponse.error);
      return;
    }

    const createNewUserDetailsResponse = await createUserDetails( createNewUserResponse.data );
    if (createNewUserDetailsResponse.statusText !== "Created") {
      console.log( "Problem creating new user details: ", createNewUserDetailsResponse );
      setLoadingFlag(false);
      setError(createNewUserDetailsResponse.error);
      return;
    }

    const createNewBookshelfResponse = await createBookshelf( createNewUserResponse.data );
    if (createNewBookshelfResponse.statusText !== "Created") {
      console.log( "Problem creating new bookshelf: ", createNewBookshelfResponse );
      setLoadingFlag(false);
      setError(createNewBookshelfResponse.error);
      return;
    }

    console.log("useSignup data = ", createNewUserResponse.data)
    localStorage.setItem( "digital-bookshelf-user", JSON.stringify(createNewUserResponse.data) );
    authDispatch({ type: AUTH_TYPES.SIGNUP, payload: createNewUserResponse.data, });
    // userDispatch({ type: USER_TYPES.SET_USER_DETAILS, payload: createNewUserDetailsResponse.data, });
    setUserDetails(createNewUserDetailsResponse.data)
    setLoadingFlag(false);
  };

  return { signup, loadingFlag, error };
};

export default useSignup;
