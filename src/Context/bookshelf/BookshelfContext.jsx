import React, { createContext, useReducer, useEffect, useState } from "react";

import SHELF_TYPES from "../../constants/types/bookshelfTypes";
import { bookshelfReducer } from "../../reducers";
import { useUserDetails } from "../../hooks";
import { getBookshelf } from "../../actions/bookshelf";

const BookshelfContext = createContext();

const BookshelfProvider = ({ children }) => {
  const [bookshelfState, dispatch] = useReducer(bookshelfReducer, {});
  const { userDetails } = useUserDetails();

  const [getBookshelfFlag, setGetBookshelfFlag] = useState(true);

  useEffect(() => {
    if (!getBookshelfFlag) return;

    const user = JSON.parse(localStorage.getItem("digital-bookshelf-user"));
    if (user) {
      const getUserBookshelf = async () => {
        const { data } = await getBookshelf({ userID: userDetails.userID }) || null;
        if (data) {
          dispatch({ type: SHELF_TYPES.SET_BOOKSHELF, payload: data });
          setGetBookshelfFlag(false);
        }
      };
      getUserBookshelf();
    }
  }, [userDetails]);

  useEffect(() => {
    console.log("bookshelfState = ", bookshelfState.contents)
  }, [bookshelfState])

  return (
    <BookshelfContext.Provider value={{ bookshelfState, dispatch }}>
      {children}
    </BookshelfContext.Provider>
  );
};

export { BookshelfContext, BookshelfProvider, bookshelfReducer };
