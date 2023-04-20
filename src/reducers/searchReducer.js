import SEARCH_TYPES from "../constants/types/searchTypes";

const searchReducer = (state, action) => {
  // console.log("in searchReducer - data = ", {state, action})
  switch (action.type) {
    case SEARCH_TYPES.SET_USER_SEARCH:
      return {...state, userSearchList: action.payload};
    case SEARCH_TYPES.CLEAR_USER_SEARCH:
        return {...state, userSearchList: []};
    case SEARCH_TYPES.SET_BOOK_SEARCH:
      return {...state, bookSearchList: action.payload};
    case SEARCH_TYPES.CLEAR_BOOK_SEARCH:
        return {...state, bookSearchList: []};
    default:
      console.log("dispatch - else");
      return state;
  }
};

export default searchReducer;
