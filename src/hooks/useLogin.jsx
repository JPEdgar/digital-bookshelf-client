import { useState } from "react";

import useAuthContext from "./context/useAuthContext"; // refactor to useAuth hook aaaaaaaaaa
import useUserContext from "./context/useUserContext"; // refactor to useUser hook aaaaaaaaaa
import useBookshelfContext from "./context/useBookshelfContext"; // refactor to useBookshelf hook aaaaaaaaaa

import AUTH_TYPES from "../constants/types/authTypes";
import USER_TYPES from "../constants/types/userTypes";
import SHELF_TYPES from "../constants/types/bookshelfTypes";

import { logIn } from "../actions/auth";
import { getUserDetails } from "../actions/user";
import { getBookshelf } from "../actions/bookshelf";

const useLogin = () => {
  const [error, setError] = useState(null);
  const [loadingFlag, setLoadingFlag] = useState(null);
  const { dispatch: authDispatch } = useAuthContext();
  const { dispatch: userDispatch } = useUserContext();
  const { dispatch: bookshelfDispatch } = useBookshelfContext();

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

    const bookshelfResponse = await getBookshelf({ email });
    if (!bookshelfResponse) {
      setError("No bookshelf found.");
      setLoadingFlag(false);
      return;
    }

    const { data: authData } = authResponse;
    const { data: userData } = userInfoResponse;
    const { data: bookshelfData } = bookshelfResponse;

    console.log("useLogin")
    console.log({authData, userData, bookshelfData})
    console.log(" - - - - ")

    if (authResponse.statusText !== "OK") {
      setError(authResponse.error);
      setLoadingFlag(false);
    } else {
      const { email, token } = authData;
      localStorage.setItem( "digital-bookshelf-user", JSON.stringify({ email, token }) ); // saves token data to local storage
      authDispatch({ type: AUTH_TYPES.LOGIN, payload: { email, token } }); // saves token data to state
      userDispatch({ type: USER_TYPES.SET_USER, payload: userData });
      bookshelfDispatch({ type: SHELF_TYPES.SET_BOOKSHELF, payload: bookshelfData, });

      setLoadingFlag(false);
    }
  };

  return { login, loadingFlag, error };
};

export default useLogin;
