import { useState } from "react";

import useUserContext from "./context/useUserContext";
import useAuthContext from "./context/useAuthContext";

import AUTH_TYPES from "../constants/types/authTypes";
import USER_TYPES from "../constants/types/userTypes";

import { signUp as signUpNewUser } from "../actions/auth";
import { getUserDetails } from "../actions/user";

const useSignup = () => {
  const [error, setError] = useState(null);
  const [loadingFlag, setLoadingFlag] = useState(null);
  const { dispatch: authDispatch } = useAuthContext();
  const { dispatch: userDispatch } = useUserContext();

  const signup = async (email, password, handle) => {
    setLoadingFlag(true);
    setError(null);

    const newAuthDetails = await signUpNewUser(email, password, handle);
    if (newAuthDetails.error) setError(newAuthDetails.error);
    else {
      const { data: newUserDetails } = await getUserDetails({
        userID: newAuthDetails.data.id,
      });
      if (newUserDetails.error) {
        setError(newUserDetails.error);
      } else {
        const { email, token } = newAuthDetails.data;
        localStorage.setItem(
          "digital-bookshelf-user",
          JSON.stringify({ email, token })
        );
        authDispatch({ type: AUTH_TYPES.SIGNUP, payload: newAuthDetails.data });
        userDispatch({ type: USER_TYPES.SET_USER, payload: newUserDetails });
      }
    }

    setLoadingFlag(false);
  };

  return { signup, loadingFlag, error };
};

export default useSignup;
