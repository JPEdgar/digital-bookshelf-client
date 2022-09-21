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
  const API = "https://www.googleapis.com/books/v1";
  const [bookshelf, setBookshelf] = useState(INITIALIZE_BOOKSHELF);

  const toggleToBookshelf = (isbnObj) => {
    const isbn = createISBNObject(isbnObj);
    console.log(isbn);

    // const newBookObject = createBookItem(bookTitle, isbn13);
    // setBookshelf((curr) => [...curr, newBookObject]);
  };

  const isInBookshelf = (isbn13) => {
    // convert to isbnObject ~ isbn10 and isbn13
    // return bookshelf.find((book) => book.id === isbn13) ? true : false;
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
      }}
    >
      {children}
    </BookshelfContext.Provider>
  );
};

export { useBookshelfContext, BookshelfProvider };
