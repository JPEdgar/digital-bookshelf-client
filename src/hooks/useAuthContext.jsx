import { useContext } from "react";

import { AuthContext } from "../context/auth/AuthContext";

const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context) throw Error("Context error - useAuthContext out-of-scope.");

  return context;
};

export default useAuthContext;
