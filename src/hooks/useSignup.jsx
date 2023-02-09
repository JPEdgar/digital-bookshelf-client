import { useState } from "react";

import { useAuthContext } from "./";

import AUTH_TYPES from "../constants/types/authTypes";

import { signUp as signUpNewUser } from "../actions/auth";
import { createNewUser } from "../actions/user";

const useSignup = () => {
  const [error, setError] = useState(null);
  const [loadingFlag, setLoadingFlag] = useState(null);
  const { dispatch: authDispatch } = useAuthContext();

  const signup = async (email, password, handle) => {
    setLoadingFlag(true);
    setError(null);

    const createUserDetails = async (data) => {
      const { email, id } = data;
      const newUserDetails = await createNewUser(email, id, handle); // actions/user, (email, id, handle)
      return newUserDetails;
    };

    const createNewUserResponse = await signUpNewUser(email, password); // actions/auth, (email, password)
    if (createNewUserResponse.statusText !== "Created") {
      setLoadingFlag(false);
      setError(createNewUserResponse.error);
      return;
    }

    const createNewUserDetailsResponse = await createUserDetails( createNewUserResponse.data );
    console.log( "createNewUserDetailsResponse = ", createNewUserDetailsResponse );
    if (createNewUserDetailsResponse.statusText !== "Created") {
      console.log( "Problem creating new user details: ", createNewUserDetailsResponse );
      setLoadingFlag(false);
      setError(createNewUserDetailsResponse.error);
      return;
    }

    localStorage.setItem( "digital-bookshelf-user", JSON.stringify(createNewUserResponse.data) );
    authDispatch({ type: AUTH_TYPES.SIGNUP, payload: createNewUserResponse.data, });

    setLoadingFlag(false);
  };

  return { signup, loadingFlag, error };
};

export default useSignup;

/*
const allPromise = Promise.all([promise1, promise2, ...]);

try {
  const values = await allPromise;
  values; // [valueOfPromise1, valueOfPromise2, ...]
} catch (error) {
  error;  // rejectReason of any first rejected promise
}
*/
