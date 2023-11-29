import { findBook as findBookAction } from "../actions/bookshelf";
import { createBookObject } from "../utilities";

const useFindBook = () => {
  const findBook = async (query) => {
    const { data } = await findBookAction(query);

    const { items: itemsList } = data;

    const filteredList = itemsList.filter(
      (x) =>
        x.volumeInfo.authors &&
        x.volumeInfo.title &&
        x.volumeInfo.industryIdentifiers &&
        x.volumeInfo.imageLinks
    );

    const returnList = filteredList.map((x) => createBookObject(x));

    return returnList;
  };

  return { findBook };
};

export default useFindBook;
