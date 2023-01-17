import React, { createContext, useReducer } from "react";

import { userReducer } from "../../reducers";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [userDetails, dispatch] = useReducer(userReducer, {  });

  return (
    <UserContext.Provider value={{ userDetails, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider, userReducer };
