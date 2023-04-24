import * as api from "../api";

const getBookshelf = async (query) => {
  //   console.log("in actions/bookshelf > getBookshelf, query = ", query);
  try {
    const data = await api.getBookshelf(query);
    return data;
  } catch (error) {
    console.log(error);
  }
};

const findBook = async (query = "'Bloodlines of Atmos'", index=0) => {
  try {
    const params = `volumes?q=${query}&startIndex=${index}`;
    const data = await api.findBook(params);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export { getBookshelf, findBook };
