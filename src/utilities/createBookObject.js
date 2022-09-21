const createBookObject = (isbnObj = {}) => {
  let newISBN;
  let isbn10;
  let isbn13;

  if (isbnObj.isbn10)
    isbn10 =
      typeof isbn10 === "string" ? parseInt(isbnObj.isbn10) : isbnObj.isbn10;
  if (isbnObj.isbn13)
    isbn13 =
      typeof isbn13 === "string" ? parseInt(isbnObj.isbn13) : isbnObj.isbn13;

  if (isbn13) newISBN = isbn13;
  else if (isbn10) newISBN = isbn10;

  if (!newISBN) {
    // window.alert( `Invalid -- ISBN10: ${isbnObj.isbn10} -- ISBN13: ${isbnObj.isbn13}` );
    console.log(
      `Invalid -- ISBN10: ${isbnObj.isbn10} -- ISBN13: ${isbnObj.isbn13}`
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
