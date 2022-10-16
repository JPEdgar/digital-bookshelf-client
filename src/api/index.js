import axios from "axios";

const url = "http://localhost:4000/api/bookshelf";

const getBooks = () => axios.get(url);
const getBook = (id) => axios.get(`${url}/${id}`);
const updateBook = (updateInfo) => axios.patch(`${url}/${updateInfo._id}`, updateInfo);
const setBook = (newBook) => axios.post(url, newBook);
const deleteBook = (id) => axios.delete(`${url}/${id}`);

export { getBooks, getBook, updateBook, setBook, deleteBook };
