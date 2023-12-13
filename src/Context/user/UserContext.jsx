import React, { createContext, useReducer, useEffect } from "react";

import USER_TYPES from "../../constants/types/userTypes";
import defaultUserDetails from "../../constants/initializations/initializeUserDetails";
import { userReducer } from "../../reducers";
import { getUserDetails } from "../../actions/user";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [userDetails, dispatch] = useReducer(userReducer, defaultUserDetails());

  useEffect(() => {
    const storageCheck = localStorage.getItem("digital-bookshelf-user");
    if (storageCheck === "undefined")
      localStorage.removeItem("digital-bookshelf-user");
    else {
      const user = JSON.parse(localStorage.getItem("digital-bookshelf-user"));

      const findAndSetDetails = async (email) => {
        const { data } = await getUserDetails({ email });
        // console.log("-------- data = ", data);
        dispatch({ type: USER_TYPES.SET_USER, payload: data });
      };

      if (user) findAndSetDetails(user.email);
    }
  }, []);

  // useEffect(() => console.log("userDetails = ", userDetails), [userDetails])

  return (
    <UserContext.Provider value={{ userDetails, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider, userReducer };
