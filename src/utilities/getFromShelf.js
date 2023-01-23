import SEARCH_TYPE from "../constants/types/searchTypes";

const getFromShelf = (bookshelf = [], searchType, searchParam) => {
  if (!bookshelf || !searchType || !searchParam) return;

  let searchResult;

  if (searchType === SEARCH_TYPE.BOOKSHELF_ID) {
    searchResult = bookshelf.find((book) => {
      return book.bookshelfID === searchParam;
    });
  }

  return searchResult;
};

export default getFromShelf;
