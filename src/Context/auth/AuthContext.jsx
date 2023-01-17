import React, { createContext, useReducer, useEffect } from "react";

import AUTH_TYPES from "../../constants/authTypes";
import { authReducer } from "../../reducers";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [userState, dispatch] = useReducer(authReducer, { user: null });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("digital-bookshelf-user"));
    if (user) dispatch({ type: AUTH_TYPES.LOGIN, payload: user });
  }, []);

  // console.log("userState = ", userState);
  return (
    <AuthContext.Provider value={{ userState, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider, authReducer };
