const createBookCoversObject = (rawCovers) => {
  const returnObject = {
    small: rawCovers.smallThumbnail,
    medium: rawCovers.thumbnail,
    large: null,
  };

  return returnObject;
};

export default createBookCoversObject;
