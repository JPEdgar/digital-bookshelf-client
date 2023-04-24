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

  const findBookOnShelf = (bookData) => {
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
    return bookshelfObject;
  };

  const toggleOnBookshelf = async (bookData) => {
    const bookshelfObject = findBookOnShelf(bookData);

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

  const isOnBookshelf = (bookData) => {
    const bookObject = findBookOnShelf(bookData);
    return bookObject.inBookshelfFlag ? true : false;
  };

  const toggleWishList = async (bookData) => {
    const bookshelfObject = findBookOnShelf(bookData);

    if (bookshelfObject) {
      const newData = { ...bookshelfObject, ...bookData };
      newData.flagsList.inWishListFlag = !newData.flagsList.inWishListFlag;
      await editBookshelfItem(bookshelf.userID, newData);
      bookshelfDispatch({ type: SHELF_TYPES.EDIT_FLAGS, payload: newData });
    } else {
      const newData = { ...bookData, flagsList: {} };
      newData.flagsList.inWishListFlag = true;
      await addNewItemToBookshelf(bookshelf.userID, newData);
      bookshelfDispatch({ type: SHELF_TYPES.ADD_BOOK, payload: newData });
    }
  };

  const isOnWishList = (bookData) => {
    const bookObject = findBookOnShelf(bookData);
    return bookObject.inWishListFlag ? true : false;
  };

  const toggleRead = async (bookData) => {
    const bookshelfObject = findBookOnShelf(bookData);

    if (bookshelfObject) {
      const newData = { ...bookshelfObject, ...bookData };
      newData.flagsList.readFlag = !newData.flagsList.readFlag;
      await editBookshelfItem(bookshelf.userID, newData);
      bookshelfDispatch({ type: SHELF_TYPES.EDIT_FLAGS, payload: newData });
    } else {
      const newData = { ...bookData, flagsList: {} };
      newData.flagsList.readFlag = true;
      await addNewItemToBookshelf(bookshelf.userID, newData);
      bookshelfDispatch({ type: SHELF_TYPES.ADD_BOOK, payload: newData });
    }
  };

  const isRead = (bookData) => {
    const bookObject = findBookOnShelf(bookData);
    return bookObject.readFlag ? true : false;
  };

  const toggleFavorite = async (bookData) => {
    const bookshelfObject = findBookOnShelf(bookData);

    if (bookshelfObject) {
      const newData = { ...bookshelfObject, ...bookData };
      newData.flagsList.favoriteFlag = !newData.flagsList.favoriteFlag;
      await editBookshelfItem(bookshelf.userID, newData);
      bookshelfDispatch({ type: SHELF_TYPES.EDIT_FLAGS, payload: newData });
    } else {
      const newData = { ...bookData, flagsList: {} };
      newData.flagsList.favoriteFlag = true;
      await addNewItemToBookshelf(bookshelf.userID, newData);
      bookshelfDispatch({ type: SHELF_TYPES.ADD_BOOK, payload: newData });
    }
  };

  const isFavorite = (bookData) => {
    const bookObject = findBookOnShelf(bookData);
    return bookObject.favoriteFlag ? true : false;
  };

  return {
    bookshelf,
    bookshelfDispatch,
    findBookOnShelf,
    setBookFocus,
    toggleOnBookshelf,
    isOnBookshelf,
    toggleWishList,
    isOnWishList,
    toggleRead,
    isRead,
    toggleFavorite,
    isFavorite,
  };
};

export default useBookshelf;
