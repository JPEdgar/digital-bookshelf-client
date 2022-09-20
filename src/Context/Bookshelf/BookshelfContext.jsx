import React, { useState, useContext, createContext, useEffect } from "react";

const BookshelfContext = createContext();

const useBookshelfContext = () => {
  return useContext(BookshelfContext);
};

const createBookItem = (bookTitle, isbnObj = {}) => {
  let newISBN;

  if (isbnObj.isbn13)
    newISBN =
      typeof isbn13 === "string" ? parseInt(isbnObj.isbn13) : isbnObj.isbn13;
  else if (isbnObj.isbn10)
    newISBN =
      typeof isbn10 === "string" ? parseInt(isbnObj.isbn10) : isbnObj.isbn10;
  else {
    window.alert(
      `Invalid ISBN for ${bookTitle} - ISBN10: ${isbnObj.isbn10} -- ISBN13: ${isbnObj.isbn13}`
    );
    return "error";
  }

  const newBookObject = {
    id: newISBN,
    title: bookTitle,
    isbn13: newISBN,
    // subtitle: "", isbn10: 0, inBookshelfFlag: true, onWishlistFlag: false, isSharedFlag: false, availablePrint: { hardBoundFlag: false, softBoundFlag: false }, availableDigitalFlag: false, availableAudioFlag: false,
  };
  return newBookObject;
};

const INITIALIZE_SEARCH = {
  searchQuery: '"Bloodlines of Atmos"',
};

const INITIALIZE_BOOKSHELF = [
  createBookItem(
    "Bloodlines of Atmos - the Story of Jace - Book 3 Redemption",
    { isbn13: 9798886530247 }
  ),
  createBookItem("Bloodlines of Atmos", { isbn13: 9781680469035 }),
  // createBookItem("Bloodlines of Atmos", 9781680468779),
];

const BookshelfProvider = ({ children }) => {
  const [searchData, setSearchData] = useState(INITIALIZE_SEARCH);
  const [searchResults, setSearchResults] = useState([]);
  const API = "https://www.googleapis.com/books/v1";
  const [bookshelf, setBookshelf] = useState(INITIALIZE_BOOKSHELF);

  const addToBookshelf = (bookTitle, isbn13) => {
    const newBookObject = createBookItem(bookTitle, isbn13);
    setBookshelf((curr) => [...curr, newBookObject]);
  };

  const isInBookshelf = (isbn13) => {
    return bookshelf.find((book) => book.id === isbn13) ? true : false;
  };

  useEffect(() => {
    // console.log("searchData = ", searchData);
  }, [searchData]);

  useEffect(() => {
    // console.log("bookshelf = ", bookshelf);
  }, [bookshelf]);

  useEffect(() => {
    console.log("searchResults = ", searchResults);
  }, [searchResults]);

  return (
    <BookshelfContext.Provider
      value={{
        searchData,
        setSearchData,
        searchResults,
        setSearchResults,
        API,
        bookshelf,
        isInBookshelf,
      }}
    >
      {children}
    </BookshelfContext.Provider>
  );
};

export { useBookshelfContext, BookshelfProvider };
