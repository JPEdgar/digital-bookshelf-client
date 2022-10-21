import React, { createContext, useReducer } from "react";

const AuthContext = createContext();

const authReducer = (state, action) => {
  switch (action.type) {
    case "SIGNUP":
      return { user: action.payload };
    case "LOGIN":
      console.log("action.payload = ", action.payload)
      return { user: action.payload };
    case "LOGOUT":
      return { user: null };
    default:
      return state;
  }
};

const AuthProvider = ({ children }) => {
  const [userState, dispatch] = useReducer(authReducer, { user: null });

  console.log("userState = ", userState);
  return (
    <AuthContext.Provider value={{ userState, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider, authReducer };
