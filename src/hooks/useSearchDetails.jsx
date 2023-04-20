import React from "react"

import SEARCH_TYPES from "../constants/types/searchTypes";
import useSearchContext from "./context/useSearchContext";

const useSearchDetails = () => {
  const { searchState, dispatch: searchDispatch } = useSearchContext();
  const { bookSearchList, userSearchList } = searchState;
  
  const updateUserSearch = (updates) => {
    searchDispatch({ type: SEARCH_TYPES.SET_USER_SEARCH, payload: updates });
  };
  
  const clearUserSearch = () => {
    searchDispatch({ type: SEARCH_TYPES.CLEAR_USER_SEARCH });
  };
  
  const updateBookSearch = (updates) => {
    searchDispatch({ type: SEARCH_TYPES.SET_BOOK_SEARCH, payload: updates });
  };
  
  const clearBookSearch = () => {
    searchDispatch({ type: SEARCH_TYPES.CLEAR_BOOK_SEARCH });
  };
  
  return {
    userSearchList,
    updateUserSearch,
    clearUserSearch,
    bookSearchList,
    updateBookSearch,
    clearBookSearch,
  };
};

export default useSearchDetails;
