import axios from "axios";

const bookshelfURL = "http://localhost:4000/api/bookshelf";
const authURL = "http://localhost:4000/api/auth";

const getBooks = (options = {}) => axios.get(bookshelfURL, { ...options });
const getBook = (id, options = {}) => axios.get(`${bookshelfURL}/${id}`, { ...options });
const updateBook = (updateInfo, options = {}) => axios.patch(`${bookshelfURL}/${updateInfo._id}`, updateInfo, { ...options });
const setBook = (newBook, options = {}) => axios.post(bookshelfURL, newBook, { ...options });
const deleteBook = (id, options = {}) => axios.delete(`${bookshelfURL}/${id}`, { ...options });

const getUser = async (email = "") => axios.get(authURL, { params: { email } });

export { getBooks, getBook, updateBook, setBook, deleteBook, getUser };
