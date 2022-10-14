import * as api from "../api";
import ACTIONS from "../constants/actionTypes";

const dispatch = () => "temp";

const getBooks = async () => {
  try {
    const { data } = await api.getBooks();
    dispatch({ type: ACTIONS.GET_BOOKS, payload: data });
  } catch (error) {
    console.log(error);
  }
};

const getBook = async () => {
  try {
  } catch (error) {
    console.log(error);
  }
};

const updateBook = async () => {
  try {
  } catch (error) {
    console.log(error);
  }
};

const setBook = async () => {
  try {
  } catch (error) {
    console.log(error);
  }
};

const deleteBook = async () => {
  try {
  } catch (error) {
    console.log(error);
  }
};

export { getBooks, getBook, updateBook, setBook, deleteBook };
