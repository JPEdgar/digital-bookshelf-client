import React, { useState } from "react";

import useBookshelfContext from "./context/useBookshelfContext";
import SHELF_TYPES from "../constants/types/bookshelfTypes";
import {
  addNewItemToBookshelf,
  editBookshelfItem,
  deleteBookshelfItem,
} from "../actions/bookshelf";

const useBookshelf = () => {
  const [isLoadingFlag, setIsLoadingFlag] = useState(false);
  const { bookshelfState: bookshelf, dispatch: bookshelfDispatch } =
    useBookshelfContext();

  const setBookFocus = async (bookData) => {
    setIsLoadingFlag(true);
    bookshelfDispatch({ type: SHELF_TYPES.SET_BOOK_FOCUS, payload: bookData });
    setIsLoadingFlag(false);
  };

  const findBookOnShelf = (isbnObj) => {
    const { contents } = bookshelf;

    let bookshelfObject;
    if (contents.length > 0) {
      for (let i = 0; i < contents.length; i++) {
        if (isbnObj?.isbn10 && contents[i].isbn?.isbn10 === isbnObj.isbn10) {
          bookshelfObject = contents[i];
          i = contents.length;
        } else if (
          isbnObj?.isbn13 &&
          contents[i].isbn?.isbn13 === isbnObj?.isbn13
        ) {
          bookshelfObject = contents[i];
          i = contents.length;
        }
      }
    }

    return bookshelfObject;
  };

  const toggleOnBookshelf = async (bookData, override = false, value) => {
    setIsLoadingFlag(true);
    const bookshelfObject = findBookOnShelf(bookData.isbn);

    if (bookshelfObject) {
      const newData = { ...bookshelfObject, ...bookData };
      if (override) newData.flagsList.inBookshelfFlag = value;
      else
        newData.flagsList.inBookshelfFlag = !newData.flagsList.inBookshelfFlag;
      await editBookshelfItem(bookshelf.userID, newData);
      bookshelfDispatch({ type: SHELF_TYPES.EDIT_FLAGS, payload: newData });
    } else {
      const newData = { ...bookData, flagsList: {} };
      if (override) newData.flagsList.inBookshelfFlag = value;
      else newData.flagsList.inBookshelfFlag = true;
      await addNewItemToBookshelf(bookshelf.userID, newData);
      bookshelfDispatch({ type: SHELF_TYPES.ADD_BOOK, payload: newData });
    }
    setIsLoadingFlag(false);
  };

  const isOnBookshelf = (isbnObj) => {
    const bookObject = findBookOnShelf(isbnObj);
    return bookObject?.flagsList?.inBookshelfFlag ? true : false;
  };

  const toggleWishList = async (bookData, override = false, value) => {
    setIsLoadingFlag(true);
    const bookshelfObject = findBookOnShelf(bookData.isbn);

    if (bookshelfObject) {
      const newData = { ...bookshelfObject, ...bookData };
      if (override) newData.flagsList.inWishListFlag = value;
      else newData.flagsList.inWishListFlag = !newData.flagsList.inWishListFlag;
      newData.flagsList.inBookshelfFlag = true;
      await editBookshelfItem(bookshelf.userID, newData);
      bookshelfDispatch({ type: SHELF_TYPES.EDIT_FLAGS, payload: newData });
    } else {
      const newData = { ...bookData, flagsList: {} };
      if (override) newData.flagsList.inWishListFlag = value;
      else newData.flagsList.inWishListFlag = true;
      newData.flagsList.inBookshelfFlag = true;
      await addNewItemToBookshelf(bookshelf.userID, newData);
      bookshelfDispatch({ type: SHELF_TYPES.ADD_BOOK, payload: newData });
    }
    setIsLoadingFlag(false);
  };

  const isOnWishList = (isbnObj) => {
    const bookObject = findBookOnShelf(isbnObj);
    return bookObject?.flagsList?.inWishListFlag ? true : false;
  };

  const toggleWantToRead = async (bookData, override = false, value) => {
    setIsLoadingFlag(true);
    const bookshelfObject = findBookOnShelf(bookData.isbn);

    if (bookshelfObject) {
      const newData = { ...bookshelfObject, ...bookData };
      if (override) newData.flagsList.wantToReadFlag = value;
      else newData.flagsList.wantToReadFlag = !newData.flagsList.wantToReadFlag;
      newData.flagsList.inBookshelfFlag = true;
      await editBookshelfItem(bookshelf.userID, newData);
      bookshelfDispatch({ type: SHELF_TYPES.EDIT_FLAGS, payload: newData });
    } else {
      const newData = { ...bookData, flagsList: {} };
      if (override) newData.flagsList.wantToReadFlag = value;
      else newData.flagsList.wantToReadFlag = true;
      newData.flagsList.inBookshelfFlag = true;
      await addNewItemToBookshelf(bookshelf.userID, newData);
      bookshelfDispatch({ type: SHELF_TYPES.ADD_BOOK, payload: newData });
    }
    setIsLoadingFlag(false);
  };

  const isWantToRead = (isbnObj) => {
    const bookObject = findBookOnShelf(isbnObj);
    return bookObject?.flagsList?.wantToReadFlag ? true : false;
  };

  const toggleHaveRead = async (bookData, override = false, value) => {
    setIsLoadingFlag(true);
    const bookshelfObject = findBookOnShelf(bookData.isbn);

    if (bookshelfObject) {
      const newData = { ...bookshelfObject, ...bookData };
      if (override) newData.flagsList.haveReadFlag = value;
      else newData.flagsList.haveReadFlag = !newData.flagsList.haveReadFlag;
      newData.flagsList.inBookshelfFlag = true;
      await editBookshelfItem(bookshelf.userID, newData);
      bookshelfDispatch({ type: SHELF_TYPES.EDIT_FLAGS, payload: newData });
    } else {
      const newData = { ...bookData, flagsList: {} };
      if (override) newData.flagsList.haveReadFlag = value;
      else newData.flagsList.haveReadFlag = true;
      newData.flagsList.inBookshelfFlag = true;
      await addNewItemToBookshelf(bookshelf.userID, newData);
      bookshelfDispatch({ type: SHELF_TYPES.ADD_BOOK, payload: newData });
    }
    setIsLoadingFlag(false);
  };

  const isHaveRead = (isbnObj) => {
    const bookObject = findBookOnShelf(isbnObj);
    return bookObject?.flagsList?.haveReadFlag ? true : false;
  };

  const toggleFavorite = async (bookData, override = false, value) => {
    setIsLoadingFlag(true);
    const bookshelfObject = findBookOnShelf(bookData.isbn);

    if (bookshelfObject) {
      const newData = { ...bookshelfObject, ...bookData };
      if (override) newData.flagsList.isFavoriteFlag = value;
      else newData.flagsList.isFavoriteFlag = !newData.flagsList.isFavoriteFlag;
      newData.flagsList.inBookshelfFlag = true;
      await editBookshelfItem(bookshelf.userID, newData);
      bookshelfDispatch({ type: SHELF_TYPES.EDIT_FLAGS, payload: newData });
    } else {
      const newData = { ...bookData, flagsList: {} };
      if (override) newData.flagsList.isFavoriteFlag = value;
      else newData.flagsList.isFavoriteFlag = true;
      newData.flagsList.inBookshelfFlag = true;
      await addNewItemToBookshelf(bookshelf.userID, newData);
      bookshelfDispatch({ type: SHELF_TYPES.ADD_BOOK, payload: newData });
    }
    setIsLoadingFlag(false);
  };

  const isFavorite = (isbnObj) => {
    const bookObject = findBookOnShelf(isbnObj);
    return bookObject?.flagsList?.isFavoriteFlag ? true : false;
  };

  const removeFromBookshelf = async (bookData) => {
    setIsLoadingFlag(true);
    const bookshelfObject = findBookOnShelf(bookData.isbn);

    if (bookshelfObject) {

        const bookshelfObjectID = bookshelfObject._id?.valueOf();
      // const bookshelfObjectID = bookshelfObject._id.valueOf(); // valueOf() seems a little buggy

      await deleteBookshelfItem(bookshelf.userID, bookshelfObjectID); 
      bookshelfDispatch({
        type: SHELF_TYPES.REMOVE_BOOKSHELF_ITEM,
        payload: { ...bookshelfObject, _id: bookshelfObjectID },
      });

    } else console.log("nothing removed");

    setIsLoadingFlag(false);
  };

  // React.useEffect(() => {
  //   console.log("bookshelf = ", bookshelf)
  // }, [bookshelf])

  return {
    isLoadingFlag,
    bookshelf,
    bookshelfDispatch,
    findBookOnShelf,
    setBookFocus,
    toggleOnBookshelf,
    isOnBookshelf,
    toggleWishList,
    isOnWishList,
    toggleWantToRead,
    isWantToRead,
    toggleHaveRead,
    isHaveRead,
    toggleFavorite,
    isFavorite,
    removeFromBookshelf,
  };
};

export default useBookshelf;
