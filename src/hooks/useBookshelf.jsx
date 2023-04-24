import React from "react";

import useBookshelfContext from "./context/useBookshelfContext";
import SHELF_TYPES from "../constants/types/bookshelfTypes";

const useBookshelf = () => {
  const { bookshelfState: bookshelf, dispatch: bookshelfDispatch } =
    useBookshelfContext();

  const setBookFocus = async (bookData) => {
    bookshelfDispatch({ type: SHELF_TYPES.SET_BOOK_FOCUS, payload: bookData });
  };

  const toggleOnBookshelf = async (bookData) => {
    const { contents } = bookshelf;
    console.log("toggleOnBookshelf clicked");
    console.log("bookshelf contents = ", contents);
    console.log("bookData = ", bookData);

    let bookshelfObject
    if (contents.length > 0) {
      for (let i = 0; i < contents.length; i++) {
        // console.log("contents[i] = ", contents[i]);
        if (
          bookData.isbn.isbn10 &&
          contents[i].isbn.isbn10 === bookData.isbn.isbn10
        ) {
          console.log("returning via isbn10", contents[i]); // return contents[i]
          bookshelfObject = contents[i]
          i = contents.length;
        } else if (
          bookData.isbn.isbn13 &&
          contents[i].isbn.isbn13 === bookData.isbn.isbn13
        ) {
          console.log("returning via isbn13", contents[i]); // return contents[i]
          bookshelfObject = contents[i]
          i = contents.length;
        } else console.log("don't think this book is in the library");
      }
    } else console.log("bookshelf empty");

    if (bookshelfObject) {
      // modifiy bookshelfObject
    } else {
      // add bookshelfObject to bookshelf
    }
  };

  return { bookshelf, bookshelfDispatch, setBookFocus, toggleOnBookshelf };
};

export default useBookshelf;
