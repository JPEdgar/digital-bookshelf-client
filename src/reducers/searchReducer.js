import SEARCH_TYPES from "../constants/types/searchTypes";

const searchReducer = (state, action) => {
  // console.log("in searchReducer - data = ", {state, action})
  switch (action.type) {
    case null:
      return action.payload;

    default:
      console.log("dispatch - else");
      return state;
  }
};

export default searchReducer;
