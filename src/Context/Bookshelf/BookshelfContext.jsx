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
  createBookObject({ isbn13: 9798886530247 }),
  createBookObject({ isbn13: 9781680469035 }),
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
    const inBookshelfId = isInBookshelf(isbn);
    if (inBookshelfId)
      setBookshelf((curr) => curr.filter((x) => x.id !== inBookshelfId));
    else setBookshelf((curr) => [...curr, createBookObject(isbn)]);
  };

  const isInBookshelf = (isbn) => {
    let returnId;
    if (bookshelf.find((book) => book.id === isbn.ISBN_10))
      returnId = isbn.ISBN_10;
    else if (bookshelf.find((book) => book.id === isbn.ISBN_13))
      returnId = isbn.ISBN_13;
    else returnId = 0;
    return returnId;
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
