import { useAuthContext, useBookshelfContext } from "../hooks";

import BOOKSHELF_TYPES from "../constants/bookshelfTypes";
import AUTH_TYPES from "../constants/authTypes";

const useLogout = () => {
  const { dispatch: authDispatch } = useAuthContext();
  const { dispatch: bookshelfDispatch } = useBookshelfContext();

  const logout = () => {
    localStorage.removeItem("digital-bookshelf-user");
    authDispatch({ type: AUTH_TYPES.LOGOUT });
    bookshelfDispatch({ type: BOOKSHELF_TYPES.CLEAR_BOOKSHELF });
  };

  return { logout };
};

export default useLogout;
