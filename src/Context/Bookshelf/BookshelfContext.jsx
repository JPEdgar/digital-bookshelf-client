import React, { createContext, useEffect, useReducer } from "react";

import { bookshelfReducer } from "../../reducers/index";
import { getBooks } from "../../actions/bookshelf";
import ACTIONS from "../../constants/actionTypes";
import { useAuthContext } from "../../hooks";

const BookshelfContext = createContext();

const BookshelfProvider = ({ children }) => {
  const [bookshelfState, dispatch] = useReducer(
    bookshelfReducer,
    INITIALIZE_STATE
  );
  const API = "https://www.googleapis.com/books/v1"; // api base link
  const { userState } = useAuthContext();
  const { user } = userState;

  useEffect(() => {
    const initializeBookshelf = async () => {
      const data = await getBooks({
        headers: { Authorization: `Bearer ${user.token}` },
      });
      dispatch({ type: ACTIONS.SET_BOOKSHELF, payload: data });
    };

    if (user) {
      initializeBookshelf();
    } else {
      dispatch({ type: ACTIONS.CLEAR_BOOKSHELF });
    }
  }, [user]);

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
