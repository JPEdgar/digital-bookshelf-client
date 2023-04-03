import React, { useState } from "react";

import AUTH_TYPES from "../constants/types/authTypes";
import USER_TYPES from "../constants/types/userTypes";
import { updateEmail, updatePassword } from "../actions/auth";
import {} from "../actions/user";

import useUserContext from "./context/useUserContext";
import useAuthContext from "./context/useAuthContext";

const useUserDetails = () => {
  const { userDetails, dispatch: userDispatch } = useUserContext();
  const { authDetails, dispatch: authDispatch } = useAuthContext();
  const [error, setError] = useState(null);
  const [loadingFlag, setLoadingFlag] = useState(null);

  const updateUserEmail = async (email, password, newEmail, token) => {
    setLoadingFlag(true);
    setError(null);

    if (!email || !password || !newEmail || !token) {
      setError("Error.  All fields required.");
      setLoadingFlag(false);
    }

    if (email === newEmail) {
      setError("Error.  Old and new email are the same.");
      setLoadingFlag(false);
    }

    const updateEmailResponse = await updateEmail( email, password, newEmail, token );
    if (updateEmailResponse.error) {
      setLoadingFlag(true);
      setError(updateEmailResponse.error);
    } 
    else {
      authDispatch({ type: AUTH_TYPES.UPDATE_EMAIL, payload: { ...authDetails, email: newEmail }, });
      userDispatch({ type: USER_TYPES.UPDATE_EMAIL, payload: { ...userDetails, email: newEmail }, });
      localStorage.setItem( "digital-bookshelf-user", JSON.stringify({ email: newEmail, token }) );
    }
  };

  const updateUserPassword = async (email, password, newPassword, token) => {
    setLoadingFlag(true);
    setError(null);

    if (!email || !password || !newPassword || !token) {
      setError("Error.  All fields required.");
      setLoadingFlag(false);
    }

    if (password === newPassword) {
      setError("Error.  Old and new password are the same.");
      setLoadingFlag(false);
    }

    const updatePasswordResponse = await updatePassword( email, password, newPassword, token );
    console.log("updatePasswordResponse = ", updatePasswordResponse);
  };

  const updateUserDetails = async (updates, token) => {
    setLoadingFlag(true);
    setError(null);

    if (!updates || !token) {
      setError("Error.  No updates available.");
      setLoadingFlag(false);
    }
  };

  return {
    userDetails,
    error,
    setError,
    loadingFlag,
    updateUserEmail,
    updateUserPassword,
    updateUserDetails,
  };
};

export default useUserDetails;
