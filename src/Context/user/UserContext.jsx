import React, { createContext, useReducer, useEffect } from "react";

import { userReducer } from "../../reducers";
import USER_TYPES from "../../constants/userTypes";
import { getUserDetails } from "../../actions/user";
// import { useAuthContext } from "../../hooks";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  // const { userState } = useAuthContext();
  const [userDetails, dispatch] = useReducer(userReducer, INITIALIZE_STATE);

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

const INITIALIZE_STATE = {
  avatar: "",
  email: "",
  firstName: "",
  friends: [],
  handle: "",
  lastName: "",
  userID: "",
};

export { UserContext, UserProvider, userReducer };
