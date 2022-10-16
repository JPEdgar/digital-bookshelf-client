import * as api from "../api";


const getBooks = async () => {
  try {
    const { data } = await api.getBooks();
    return data;
  } catch (error) {
    console.log(error);
  }
};

const getBook = async (id) => {
  try {
    const { data } = await api.getBook(id);
    return data;
  } catch (error) {
    console.log(error);
  }
};

const updateBook = async (update) => {
  try {
    const { data } = await api.updateBook(update);
    return data;
  } catch (error) {
    console.log(error);
  }
};

const setBook = async (newBook) => {
  try {
    const { data } = await api.setBook(newBook);
    return data;
  } catch (error) {
    console.log(error);
  }
};

const deleteBook = async (id) => {
  try {
    const { data } = await api.deleteBook(id);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export { getBooks, getBook, updateBook, setBook, deleteBook };
