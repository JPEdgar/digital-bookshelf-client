import React, { createContext, useEffect, useReducer } from "react";

import { bookshelfReducer } from "../../reducers/index";
import { getBooks } from "../../actions/bookshelf";
import BOOKSHELF_TYPES from "../../constants/bookshelfTypes";
import { useAuthContext } from "../../hooks";

const BookshelfContext = createContext();

const BookshelfProvider = ({ children }) => {
  const [bookshelfState, dispatch] = useReducer(
    bookshelfReducer,
    INITIALIZE_STATE
  );
  const API = "https://www.googleapis.com/books/v1"; // api base link
  const { authState } = useAuthContext();

  // useEffect(() => {
  //   // console.log("user = ", user);
  //   const initializeBookshelf = async () => {
  //     const data = await getBooks({ headers: { Authorization: `Bearer ${user.token}` }, });
  //     dispatch({ type: BOOKSHELF_TYPES.SET_BOOKSHELF, payload: data });
  //   };

  //   if (user) {
  //     initializeBookshelf();
  //   } else {
  //     dispatch({ type: BOOKSHELF_TYPES.CLEAR_BOOKSHELF });
  //   }
  // }, [user]);

  // useEffect(() => console.log("state = ", state), [state]);

  return (
    <BookshelfContext.Provider value={{ API, bookshelfState, dispatch }}>
      {children}
    </BookshelfContext.Provider>
  );
};

const INITIALIZE_STATE = {
  bookshelf: [],
  // searchData: { searchQuery: "drizzt" },
  searchData: { searchQuery: '"Bloodlines of Atmos"' },
  searchResults: null,
  bookDetail: null,
};

export { BookshelfContext, BookshelfProvider };
