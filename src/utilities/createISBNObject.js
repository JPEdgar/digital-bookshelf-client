const createISBNObject = (rawISBN) => {
  const returnObject = {
    isbn10: null,
    isbn13: null,
  };

  for (let i = 0; i < rawISBN.length; i++) {
    if (rawISBN[i].type === "ISBN_10")
      returnObject.isbn10 = rawISBN[i].identifier;
    else if (rawISBN[i].type === "ISBN_13")
      returnObject.isbn13 = rawISBN[i].identifier;
  }
  return returnObject;
};

export default createISBNObject;
