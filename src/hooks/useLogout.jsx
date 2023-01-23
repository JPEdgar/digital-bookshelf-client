import { useAuthContext, useBookshelfContext } from "../hooks";

import BOOKSHELF_TYPES from "../constants/types/bookshelfTypes";
import AUTH_TYPES from "../constants/types/authTypes";
import { useUserDetails } from "./";

const useLogout = () => {
  const { dispatch: authDispatch } = useAuthContext();
  const { dispatch: bookshelfDispatch } = useBookshelfContext();
  const { clearUserDetails } = useUserDetails();

  const logout = () => {
    localStorage.removeItem("digital-bookshelf-user");
    authDispatch({ type: AUTH_TYPES.LOGOUT });
    bookshelfDispatch({ type: BOOKSHELF_TYPES.CLEAR_BOOKSHELF });
    clearUserDetails();
  };

  return { logout };
};

export default useLogout;
