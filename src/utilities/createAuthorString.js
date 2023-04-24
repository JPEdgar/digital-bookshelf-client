const createAuthorString = (rawAuthors) => {
  let returnString = "";
  if (rawAuthors?.length === 1) returnString = rawAuthors[0];
  else {
    for (let i = 0; i < rawAuthors?.length; i++) {
      if (i < rawAuthors.length - 1) returnString += `${rawAuthors[i]}, `;
      else returnString += `and ${rawAuthors[i]}`;
    }
  }
  return returnString;
};

export default createAuthorString;
