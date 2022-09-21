import React, { useState, useContext, createContext, useEffect } from "react";

import { createISBNObject, createBookObject } from "../../utilities";

const BookshelfContext = createContext();

const useBookshelfContext = () => {
  return useContext(BookshelfContext);
};

const INITIALIZE_SEARCH = {
  searchQuery: '"Bloodlines of Atmos"',
};

const INITIALIZE_BOOKSHELF = [
  createBookObject(
    "Bloodlines of Atmos - the Story of Jace - Book 3 Redemption",
    { isbn13: 9798886530247 }
  ),
  createBookObject("Bloodlines of Atmos", { isbn13: 9781680469035 }),
  // createBookItem("Bloodlines of Atmos", 9781680468779),
];

const BookshelfProvider = ({ children }) => {
  const [searchData, setSearchData] = useState(INITIALIZE_SEARCH);
  const [searchResults, setSearchResults] = useState([]);
  const [bookDetail, setBookDetail] = useState();
  const API = "https://www.googleapis.com/books/v1";
  const [bookshelf, setBookshelf] = useState(INITIALIZE_BOOKSHELF);

  const toggleToBookshelf = (isbnObj) => {
    const isbn = createISBNObject(isbnObj);
    // console.log(isbn);

    isInBookshelf(isbn);
    // if (isInBookshelf(isbn.ISBN_10)) console.log("10 - true")
    // else if (isInBookshelf(isbn.ISBN_13)) console.log("13 - true")
    // else console.log("false: ", isbn)
    // const newBookObject = createBookItem(bookTitle, isbn13);
    // setBookshelf((curr) => [...curr, newBookObject]);
  };

  const isInBookshelf = (isbn) => {
    let returnFlag;
    if (
      bookshelf.find((book) => book.id === isbn.ISBN_10) ||
      bookshelf.find((book) => book.id === isbn.ISBN_13)
    )
      returnFlag = true;
    else returnFlag = false;
    return returnFlag;
  };

  useEffect(() => {
    // console.log("searchData = ", searchData);
  }, [searchData]);

  useEffect(() => {
    // console.log("bookshelf = ", bookshelf);
  }, [bookshelf]);

  useEffect(() => {
    // console.log("searchResults = ", searchResults);
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
        toggleToBookshelf,
        bookDetail,
        setBookDetail,
      }}
    >
      {children}
    </BookshelfContext.Provider>
  );
};

export { useBookshelfContext, BookshelfProvider };
