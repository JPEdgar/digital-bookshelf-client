import React, { createContext, useReducer, useEffect } from "react";

import { userReducer } from "../../reducers";
import USER_TYPES from "../../constants/types/userTypes";
import { getUserDetails } from "../../actions/user";
import defaultUserDetails from "../../constants/initializations/initializeUserDetails";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [userDetails, dispatch] = useReducer(userReducer, defaultUserDetails());

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("digital-bookshelf-user"));

    const findAndSetDetails = async (email) => {
      const data = await getUserDetails(email);
      // console.log("-------- data = ", data)
      dispatch({ type: USER_TYPES.SET_USER_DETAILS, payload: data });
    };

    if (user) findAndSetDetails(user.email);
  }, []);

  // useEffect(() => console.log("--- context userDetails = ", userDetails), [userDetails])

  return (
    <UserContext.Provider value={{ userDetails, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider, userReducer };
