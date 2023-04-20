import React, { createContext, useReducer, useEffect } from "react";

import defaultSearchResults from "../../constants/initializations/initializeSearchDetails";

import SEARCH_TYPES from "../../constants/types/authTypes";
import { searchReducer } from "../../reducers";

const SearchContext = createContext();

const SearchProvider = ({ children }) => {
  const [searchState, dispatch] = useReducer(searchReducer, defaultSearchResults);

  return (
    <SearchContext.Provider value={{ searchState, dispatch }}>
      {children}
    </SearchContext.Provider>
  );
};

export { SearchContext, SearchProvider, searchReducer };
