import React, { createContext, useReducer, useEffect } from "react";

import { userReducer } from "../../reducers";
import USER_TYPES from "../../constants/userTypes";
import { getUserDetails } from "../../actions/user";
const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [userDetails, dispatch] = useReducer(userReducer, {});

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("digital-bookshelf-user"));

    const findAndSetDetails = async (email) => {
      const data = await getUserDetails(email);
      dispatch({ type: USER_TYPES.SET_USER_DETAILS, payload: data });
    };

    if (user) findAndSetDetails(user.email);
  }, []);

  return (
    <UserContext.Provider value={{ userDetails, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider, userReducer };
