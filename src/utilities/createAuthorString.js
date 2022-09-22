const createAuthorString = (authorsList = []) => {
    let authorString = "";

    for (let i = 0; i < authorsList.length; i++) {
      if (i === 0) authorString += authorsList[i];
      else if (i >= authorsList.length - 1) authorString += `, and ${authorsList[i]}`;
      else if (i < authorsList.length) authorString += `, ${authorsList[i]}`;
    }

    return authorString;
  };

  export default createAuthorString