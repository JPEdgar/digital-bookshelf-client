import { findBook as findBookAction } from "../actions/bookshelf";
import { createBookObject } from "../utilities";

const useFindBook = () => {
  const findBook = async (query) => {
    const { data } = await findBookAction(query);
    const { items: itemsList } = data;

    // console.log(itemsList)
    const returnList = itemsList.map(x => createBookObject(x))

    return returnList;
  };

  return { findBook };
};

export default useFindBook;
