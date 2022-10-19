// input API industry identifier list
const createISBNObject = (industryIDList) => {
  // console.log("using createISBNObject utility")
  let isbnObject = {};
  industryIDList.map(
    (industryId) =>
      (isbnObject = {
        ...isbnObject,
        [industryId.type]: parseInt(industryId.identifier),
      })
  );
  return isbnObject;
};

export default createISBNObject;
