import React from "react";

import useBookshelfContext from "./context/useBookshelfContext";
import SHELF_TYPES from "../constants/types/bookshelfTypes";

const useBookshelf = () => {
  const { bookshelfState: bookshelf, dispatch: bookshelfDispatch } =
    useBookshelfContext();

  const setBookFocus = async (bookData) => {
    bookshelfDispatch({ type: SHELF_TYPES.SET_BOOK_FOCUS, payload: bookData });
  };

  return { bookshelf, bookshelfDispatch, setBookFocus };
};

export default useBookshelf;
