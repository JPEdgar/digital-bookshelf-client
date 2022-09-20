import React, { useState, useContext, createContext, useEffect } from "react";

const BookshelfContext = createContext();

const useBookshelfContext = () => {
  return useContext(BookshelfContext);
};

const INITIALIZE_STATE = {
  searchQuery: "\"Bloodlines of Atmos\"",
};

const BookshelfProvider = ({ children }) => {
  const [searchData, setSearchData] = useState(INITIALIZE_STATE);
  const [searchResults, setSearchResults] = useState([]);
const API = "https://www.googleapis.com/books/v1"
  useEffect(() => {
    console.log("searchData = ", searchData);
  }, [searchData]);

  return (
    <BookshelfContext.Provider
      value={{ searchData, setSearchData, searchResults, setSearchResults , API}}
    >
      {children}
    </BookshelfContext.Provider>
  );
};

export { useBookshelfContext, BookshelfProvider };
