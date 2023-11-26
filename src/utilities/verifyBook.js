const verifyBook = (
  bookData,
  flags = {
    checkIsbn: true,
    checkCover: true,
    checkTitle: true,
    checkAuthor: true,
  }
) => {
  const { checkIsbn, checkCover, checkTitle, checkAuthor } = flags;

  const isbnFlag =
    checkIsbn && (bookData.isbn.isbn10 || bookData.isbn.isbn13) ? true : false;

  const coverFlag =
    checkCover &&
    (bookData.coversList.large ||
      bookData.coversList.medium ||
      bookData.coversList.small)
      ? true
      : false;

  const titleFlag = checkTitle && bookData.title ? true : false;

  const authorFlag = checkAuthor && bookData.authorString ? true : false;

  const returnValue =
    isbnFlag && coverFlag && titleFlag && authorFlag ? true : false;

  return returnValue;
};

export default verifyBook;
