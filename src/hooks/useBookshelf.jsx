import React from "react";

import useBookshelfContext from "./context/useBookshelfContext";
import SHELF_TYPES from "../constants/types/bookshelfTypes";
import { addNewItemToBookshelf, editBookshelfItem } from "../actions/bookshelf";

const useBookshelf = () => {
  const { bookshelfState: bookshelf, dispatch: bookshelfDispatch } =
    useBookshelfContext();

  const setBookFocus = async (bookData) => {
    bookshelfDispatch({ type: SHELF_TYPES.SET_BOOK_FOCUS, payload: bookData });
  };

  const toggleOnBookshelf = async (bookData) => {
    const { contents } = bookshelf;

    let bookshelfObject;
    if (contents.length > 0) {
      for (let i = 0; i < contents.length; i++) {
        if (
          bookData.isbn.isbn10 &&
          contents[i].isbn.isbn10 === bookData.isbn.isbn10
        ) {
          bookshelfObject = contents[i];
          i = contents.length;
        } else if (
          bookData.isbn.isbn13 &&
          contents[i].isbn.isbn13 === bookData.isbn.isbn13
        ) {
          bookshelfObject = contents[i];
          i = contents.length;
        }
      }
    }

    if (bookshelfObject) {
      const newData = { ...bookshelfObject, ...bookData };
      newData.flagsList.inBookshelfFlag = !newData.flagsList.inBookshelfFlag;
      await editBookshelfItem(bookshelf.userID, newData);
      bookshelfDispatch({ type: SHELF_TYPES.EDIT_FLAGS, payload: newData });
    } else {
      const newData = { ...bookData, flagsList: {} };
      newData.flagsList.inBookshelfFlag = true;
      await addNewItemToBookshelf(bookshelf.userID, newData);
      bookshelfDispatch({ type: SHELF_TYPES.ADD_BOOK, payload: newData });
    }
  };

  return { bookshelf, bookshelfDispatch, setBookFocus, toggleOnBookshelf };
};

export default useBookshelf;
