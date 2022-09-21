const createBookObject = (bookTitle, isbnObj = {}) => {
  let newISBN;

  if (isbnObj.isbn13)
    newISBN =
      typeof isbn13 === "string" ? parseInt(isbnObj.isbn13) : isbnObj.isbn13;
  else if (isbnObj.isbn10)
    newISBN =
      typeof isbn10 === "string" ? parseInt(isbnObj.isbn10) : isbnObj.isbn10;
  else {
    window.alert(
      `Invalid ISBN for ${bookTitle} - ISBN10: ${isbnObj.isbn10} -- ISBN13: ${isbnObj.isbn13}`
    );
    return "error";
  }

  const newBookObject = {
    id: newISBN,
    title: bookTitle,
    isbn13: newISBN,
    // subtitle: "", isbn10: 0, inBookshelfFlag: true, onWishlistFlag: false, isSharedFlag: false, availablePrint: { hardBoundFlag: false, softBoundFlag: false }, availableDigitalFlag: false, availableAudioFlag: false,
  };
  return newBookObject;
};

export default createBookObject;
