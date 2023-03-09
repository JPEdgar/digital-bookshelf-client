import useAuthContext from "./context/useAuthContext"; // refactor to useAuth hook aaaaaaaaaa
import useUserContext from "./context/useUserContext"; // refactor to useUser hook aaaaaaaaaa

import AUTH_TYPES from "../constants/types/authTypes";
import USER_TYPES from "../constants/types/userTypes";

const useLogout = () => {
  const { dispatch: authDispatch } = useAuthContext();
  const { dispatch: userDispatch } = useUserContext();

  const logout = () => {
    localStorage.removeItem("digital-bookshelf-user");
    authDispatch({ type: AUTH_TYPES.LOGOUT });
    userDispatch({ type: USER_TYPES.LOGOUT });
  };

  return { logout };
};

export default useLogout;
