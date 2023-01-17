import BOOKSHELF_TYPES from "../constants/bookshelfTypes";

const bookshelfReducer = (state, action) => {
  let oldBookshelf = [];
  let newBookshelf = [];

  switch (action.type) {
    case BOOKSHELF_TYPES.SET_SEARCH_RESULTS:
      return { ...state, searchResults: action.payload };
    case BOOKSHELF_TYPES.UPDATE_SEARCH_PARAMS:
      const { searchData } = state;
      searchData[action.payload.name] = action.payload.value;
      return { ...state, searchData };

    case BOOKSHELF_TYPES.CLEAR_BOOKSHELF:
      // return { ...state, bookshelf: [] };
      return state;
    case BOOKSHELF_TYPES.SET_BOOK_DETAILS:
      // return { ...state, bookDetail: action.payload };
      return state;
    case BOOKSHELF_TYPES.SET_BOOKSHELF:
      // return { ...state, bookshelf: action.payload };
      return state;
    case BOOKSHELF_TYPES.UPDATE_BOOKSHELF_ITEM:
      // oldBookshelf = state.bookshelf.filter( (x) => x.bookshelfID !== action.payload.bookshelfID );
      // newBookshelf = [...oldBookshelf, action.payload];
      // return { ...state, bookshelf: newBookshelf };
      return state;
    case BOOKSHELF_TYPES.CREATE_BOOKSHELF_ITEM:
      // return { ...state, bookshelf: [...state.bookshelf, action.payload] };
      return state;
    case BOOKSHELF_TYPES.DELETE_BOOKSHELF_ITEM:
      // newBookshelf = state.bookshelf.filter((x) => x._id !== action.payload);
      // console.log(newBookshelf)
      // return { ...state, bookshelf: newBookshelf };
      return state;

    default:
      return state;
  }
};

export default bookshelfReducer;
