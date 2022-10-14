import axios from "axios";

const url = "http://localhost:4000/api/bookshelf";

const getBooks = () => axios.get(url);
const getBook = (id) => axios.get(`${url}/${id}`);
const updateBook = (id) => axios.patch(`${url}/${id}`);
const setBook = () => axios.post(url);
const deleteBook = (id) => axios.delete(`${url}/${id}`);

export { getBooks, getBook, updateBook, setBook, deleteBook };
