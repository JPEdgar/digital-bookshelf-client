const createBookObject = (isbnObj = {}) => {
  let newISBN;
  let isbn10;
  let isbn13;

  if (isbnObj.ISBN_10)
    isbn10 =
      typeof isbn10 === "string" ? parseInt(isbnObj.ISBN_10) : isbnObj.ISBN_10;
  if (isbnObj.ISBN_13)
    isbn13 =
      typeof isbn13 === "string" ? parseInt(isbnObj.ISBN_13) : isbnObj.ISBN_13;

  if (isbn13) newISBN = isbn13;
  else if (isbn10) newISBN = isbn10;

  if (!newISBN) {
    // window.alert( `Invalid -- ISBN10: ${isbnObj.isbn_10} -- ISBN13: ${isbnObj.isbn_13}` );
    console.log(
      `Invalid -- ISBN10: ${isbnObj.ISBN_10} -- ISBN13: ${isbnObj.ISBN_13}`
    );
    return "error";
  }

  const newBookObject = {
    id: newISBN,
    isbn10: isbn10,
    isbn13: isbn13,
    inBookshelfFlag: true,
    // title: bookTitle, subtitle: "", , onWishlistFlag: false, isSharedFlag: false, availablePrint: { hardBoundFlag: false, softBoundFlag: false }, availableDigitalFlag: false, availableAudioFlag: false,
  };
  return newBookObject;
};

export default createBookObject;
