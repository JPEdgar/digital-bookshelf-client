import React, { createContext, useReducer, useEffect } from "react";

import USER_TYPES from "../../constants/userTypes";
import { userReducer } from "../../reducers";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [userState, dispatch] = useReducer(userReducer, null);

  return (
    <UserContext.Provider value={{ userState, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider, userReducer };
