import React, { createContext, useReducer } from "react";

import defaultSearchResults from "../../constants/initializations/initializeSearchDetails";

import { searchReducer } from "../../reducers";

const SearchContext = createContext();

const SearchProvider = ({ children }) => {
  const [searchState, dispatch] = useReducer(
    searchReducer,
    defaultSearchResults
  );

  return (
    <SearchContext.Provider value={{ searchState, dispatch }}>
      {children}
    </SearchContext.Provider>
  );
};

export { SearchContext, SearchProvider, searchReducer };
