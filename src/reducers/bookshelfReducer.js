import ACTIONS from "../constants/actionTypes";

import { getFromShelf } from "../utilities";

const bookshelfReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SET_BOOKSHELF:
      return { ...state, bookshelf: action.payload };
    case ACTIONS.UPDATE_SEARCH_PARAMS:
      const { searchData } = state;
      searchData[action.payload.name] = action.payload.value;
      return { ...state, searchData };
    case ACTIONS.SET_BOOK_DETAILS:
      let returnObj
      console.log(action.payload)
      return { ...state, bookDetail: action.payload };
    case ACTIONS.SET_SEARCH_RESULTS:
      return { ...state, searchResults: action.payload };
    default:
      return state;
  }
};

export default bookshelfReducer;
