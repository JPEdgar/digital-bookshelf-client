import { useAuthContext, useBookshelfContext } from "../hooks";

import ACTIONS from "../constants/actionTypes";

const useLogout = () => {
  const { dispatch: authDispatch } = useAuthContext();
  const { dispatch:bookshelfDispatch } = useBookshelfContext();

  const logout = () => {
    localStorage.removeItem("user");
    authDispatch({ type: "LOGOUT" });
    bookshelfDispatch({type: ACTIONS.CLEAR_BOOKSHELF})
  };

  return { logout };
};

export default useLogout;
