const createBookGenreString = (rawData) => {
  const returnString = rawData?.join(", ");
  return returnString;
};

export default createBookGenreString;
