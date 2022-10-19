import React, { createContext, useEffect, useReducer } from "react";

import { bookshelfReducer } from "../../reducers/index";
import { getBooks } from "../../actions/bookshelf";
import ACTIONS from "../../constants/actionTypes";

const BookshelfContext = createContext();

const BookshelfProvider = ({ children }) => {
  const [state, dispatch] = useReducer(bookshelfReducer, INITIALIZE_STATE);
  const API = "https://www.googleapis.com/books/v1"; // api base link

  const isInBookshelf = () => {
    //
  };

  useEffect(() => {
    const initializeState = async () => {
      const data = await getBooks();
      dispatch({ type: ACTIONS.SET_BOOKSHELF, payload: data });
    };
    initializeState();
  }, []);

  // useEffect(() => console.log("state = ", state), [state]);

  return (
    <BookshelfContext.Provider value={{ API, state, dispatch, isInBookshelf }}>
      {children}
    </BookshelfContext.Provider>
  );
};

const INITIALIZE_STATE = {
  bookshelf: [],
  searchData: { searchQuery: '"Bloodlines of Atmos"' },
  searchResults: null,
  bookDetail: null,
};

export { BookshelfContext, BookshelfProvider };
