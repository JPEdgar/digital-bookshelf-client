// input API industry identifier list
const createISBNObject = (industryIDList) => {
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
