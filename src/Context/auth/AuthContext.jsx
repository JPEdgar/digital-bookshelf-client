import React, { createContext, useReducer, useEffect } from "react";

import AUTH_TYPES from "../../constants/types/authTypes";
import { authReducer } from "../../reducers";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [authState, dispatch] = useReducer(authReducer, { user: null });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("digital-bookshelf-user"));
    if (user)
      dispatch({
        type: AUTH_TYPES.LOGIN,
        payload: { email: user.email, token: user.token },
      });
  }, []);

  return (
    <AuthContext.Provider value={{ authState, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider, authReducer };
