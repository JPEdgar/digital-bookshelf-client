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

const findBook = async (query = "'Bloodlines of Atmos'", index = 0) => {
  try {
    const params = `volumes?q=${query}&startIndex=${index}`;
    // &q=inauthor:"J.+P.+Edgar"
    // &q=intitle: "Bloodlines+of+Atmos"
    // &q=inpublisher: "melange"
    // &q=isbn: 
    // Here is an example of searching for Daniel Keyes' "Flowers for Algernon":
    // GET https://www.googleapis.com/books/v1/volumes?q=flowers+inauthor:keyes&key=yourAPIKey
    const data = await api.findBook(params);
    return data;
  } catch (error) {
    console.log(error);
  }
};

const addNewItemToBookshelf = async (userID, bookObj, token) => {
  try {
    const data = await api.addNewItemToBookshelf(userID, bookObj, token);
    return data;
  } catch (error) {
    console.log(error);
  }
};

const editBookshelfItem = async (userID, bookObj, token) => {
  try {
    const data = await api.editBookshelfItem(userID, bookObj, token);
    return data;
  } catch (error) {
    console.log(error);
  }
};

const deleteBookshelfItem = async (userID, bookshelfObjectID) => {
  try {
    const data = await api.deleteBookshelfItem(userID, bookshelfObjectID);
    return data;
  } catch (error) {
    console.log(error);
  }
};

const getFriendsBookshelf = async (query) => {
  try {
    const data = await api.getFriendsBookshelf(query);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export {
  getBookshelf,
  findBook,
  addNewItemToBookshelf,
  editBookshelfItem,
  deleteBookshelfItem,
  getFriendsBookshelf,
};
