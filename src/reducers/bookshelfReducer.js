import SHELF_TYPES from "../constants/types/bookshelfTypes";

const bookshelfReducer = (state, action) => {
  // console.log("in bookshelfReducer - data = ", {state, action})
  switch (action.type) {
    case SHELF_TYPES.SET_BOOKSHELF:
      return action.payload;
    case SHELF_TYPES.SET_BOOK_FOCUS:
      return { ...state, bookFocus: action.payload };
    case SHELF_TYPES.ADD_BOOK:
      return { ...state, contents: [...state.contents, action.payload] };
    case SHELF_TYPES.EDIT_FLAGS:
      const newShelf = state.contents.map((x) => {
        let ret;
        if (
          action.payload.isbn.isbn10 &&
          x.isbn.isbn10 === action.payload.isbn.isbn10
        )
          ret = action.payload;
        else if (
          action.payload.isbn.isbn13 &&
          x.isbn.isbn13 === action.payload.isbn.isbn13
        )
          ret = action.payload;
        else ret = x;

        return ret;
      });

      return { ...state, contents: newShelf };
    case SHELF_TYPES.REMOVE_BOOKSHELF_ITEM:
        // console.log("in bookshelfReducer - data = ", {state, action})
        const newContents = state.contents.filter(x => x._id !== action.payload._id)
        // console.log(test)
      return { ...state, contents: newContents };
    default:
      console.log("dispatch - else");
      return state;
  }
};

export default bookshelfReducer;
