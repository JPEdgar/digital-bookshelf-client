import { getBookDetails } from "../utilities";

// use after isbnObj was created by createISBNObject
const createBookObject = async (API, isbnObj = {}) => {
  // console.log("using createBookObject utility");
  let bookDetails;
  let isbn10;
  let isbn13;

  let newBookObject;

  if (isbnObj.ISBN_13) {
    isbn13 =
      typeof isbn13 === "string" ? parseInt(isbnObj.ISBN_13) : isbnObj.ISBN_13;
  }
  if (isbnObj.ISBN_10) {
    isbn10 =
      typeof isbn10 === "string" ? parseInt(isbnObj.ISBN_10) : isbnObj.ISBN_10;
  }

  if (isbn13) {
    bookDetails = await getBookDetails(API, isbn13);
  } else if (isbn10) {
    bookDetails = await getBookDetails(API, isbn10);
  }

  newBookObject = createNewBookObject(bookDetails, isbn10, isbn13);

  return newBookObject;
};

const createNewBookObject = (bookDetails, isbn10, isbn13) => {
  // console.log("using createNewBookObject utility");
  const description = bookDetails.volumeInfo.description
    ? bookDetails.volumeInfo.description
    : "No description listed.";

  const authors = bookDetails.volumeInfo.authors
    ? bookDetails.volumeInfo.authors
    : "No authors listed.";

  const title = bookDetails.volumeInfo.title
    ? bookDetails.volumeInfo.title
    : "No title listed.";

  const newBookObject = {
    bookshelfID: bookDetails.id,
    isbn10: isbn10,
    isbn13: isbn13,
    title: title,
    subtitle: bookDetails.volumeInfo?.subtitle,
    authors: authors,
    imageLinks: bookDetails.volumeInfo.imageLinks,
    categories: bookDetails.volumeInfo.categories,
    description: description,
    pageCount: bookDetails.volumeInfo.pageCount,
    publishDate: bookDetails.volumeInfo.publishedDate,
    publisher: bookDetails.volumeInfo.publisher,
    ratingsCount: bookDetails.volumeInfo.ratingsCount,
    averageRating: bookDetails.volumeInfo.averageRating,
    inBookshelfFlag: true,
    isFavoriteFlag: false,
    // onWishlistFlag: false,
    // isSharedFlag: false,
    // availablePrint: { hardBoundFlag: false, softBoundFlag: false },
    // availableDigitalFlag: false,
    // availableAudioFlag: false,
  };

  return newBookObject;
};

export default createBookObject;
