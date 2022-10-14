import ACTIONS from "../constants/actionTypes";

const bookshelfReducer = (books = [], action) => {
  switch (action.type) {
    case ACTIONS.GET_BOOKS:
      return action.payload;

    default:
      return books;
  }
};

export { bookshelfReducer };
