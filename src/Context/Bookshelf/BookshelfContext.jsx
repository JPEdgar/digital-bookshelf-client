import React, { useState, createContext, useEffect } from "react";

import axios from "axios";

const BookshelfContext = createContext();

const BookshelfProvider = ({ children }) => {
  const API = "https://www.googleapis.com/books/v1"; // api base link
  const [searchData, setSearchData] = useState(INITIALIZE_SEARCH); // search query/parameters
  const [searchResults, setSearchResults] = useState([]); // results from search
  const [bookDetail, setBookDetail] = useState(null); // details about a single book
  const [bookshelf, setBookshelf] = useState([]); // main store for user's books (will replace bookDetail?)

  const toggleToBookshelf = (isbnObj) => null;


  const isOnBookshelf = (id = null, isbnObj = null) => {  };

  // useEffect(() => console.log("searchData = ", searchData), [searchData]);
  // useEffect(() => console.log("searchResults = ", searchResults), [searchResults] );
  // useEffect(() => console.log("bookshelf = ", bookshelf), [bookshelf]);
  // useEffect(() => console.log("bookDetail = ", bookDetail), [bookDetail]);

  useEffect(() => {
    const initializeBookshelf = async () => {
      const bookshelfData = await axios.get("http://localhost:4000/api/bookshelf");
      setBookshelf(bookshelfData.data);
    };

    initializeBookshelf();
  }, []);

  return (
    <BookshelfContext.Provider
      value={{
        searchData,
        setSearchData,
        searchResults,
        setSearchResults,
        bookDetail,
        setBookDetail,
        API,
        bookshelf,
        toggleToBookshelf,
        isOnBookshelf,
      }}
    >
      {children}
    </BookshelfContext.Provider>
  );
};

const INITIALIZE_SEARCH = {
  searchQuery: '"Bloodlines of Atmos"',
};

export { BookshelfContext, BookshelfProvider };
