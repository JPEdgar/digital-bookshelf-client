const createBookCoversObject = (rawCovers) => {
  // console.log("rawCovers = ", rawCovers)
  const returnObject = {
    small: rawCovers?.smallThumbnail,
    medium: rawCovers?.thumbnail,
    large: undefined,
  };

  return returnObject;
};

export default createBookCoversObject;
