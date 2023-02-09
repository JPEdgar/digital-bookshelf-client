import { useAuthContext } from "../hooks";

import AUTH_TYPES from "../constants/types/authTypes";

const useLogout = () => {
  const { dispatch: authDispatch } = useAuthContext();

  const logout = () => {
    localStorage.removeItem("digital-bookshelf-user");
    authDispatch({ type: AUTH_TYPES.LOGOUT });
  };

  return { logout };
};

export default useLogout;
