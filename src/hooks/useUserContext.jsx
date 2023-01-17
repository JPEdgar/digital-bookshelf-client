import { useContext } from "react";

import { UserContext } from "../context/user/UserContext";

const useUserContext = () => {
  const context = useContext(UserContext);

  if (!context) throw Error("Context error - useUserContext out-of-scope.");

  return context;
};

export default useUserContext;
