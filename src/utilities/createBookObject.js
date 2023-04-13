import {
  createBookCoversObject,
  createISBNObject,
  createAuthorString,
  createBookGenreString,
} from "./index";

const createBookObject = (rawData) => {
  const returnObj = {
    googleID: rawData.id,
    title: rawData.volumeInfo.title,
    subtitle: rawData.volumeInfo.subtitle,
    authorsList: rawData.volumeInfo.authors,
    authorString: createAuthorString(rawData.volumeInfo.authors),
    snippet: rawData.volumeInfo.description,
    isbn: createISBNObject(rawData.volumeInfo.industryIdentifiers),
    categoriesString: createBookGenreString(rawData.volumeInfo.categories),
    categoriesList: rawData.volumeInfo.categories,
    coversList: createBookCoversObject(rawData.volumeInfo.imageLinks),
    publishDate: rawData.volumeInfo.publishedDate,
    pageCount: rawData.volumeInfo.pageCount,
    publisher: rawData.volumeInfo.publisher,
  };
  return returnObj;
};

export default createBookObject;
