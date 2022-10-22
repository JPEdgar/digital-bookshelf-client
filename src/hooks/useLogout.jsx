import { useAuthContext, useBookshelfContext } from "../hooks";

import BOOKSHELF_TYPES from "../constants/bookshelfTypes";

const useLogout = () => {
  const { dispatch: authDispatch } = useAuthContext();
  const { dispatch: bookshelfDispatch } = useBookshelfContext();

  const logout = () => {
    localStorage.removeItem("user");
    authDispatch({ type: "LOGOUT" });
    bookshelfDispatch({ type: BOOKSHELF_TYPES.CLEAR_BOOKSHELF });
  };

  return { logout };
};

export default useLogout;
