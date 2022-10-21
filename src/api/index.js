import axios from "axios";

const url = "http://localhost:4000/api/bookshelf";

const getBooks = (options) => axios.get(url, {...options});
const getBook = (id, options) => axios.get(`${url}/${id}`, {...options})
const updateBook = (updateInfo, options) => axios.patch(`${url}/${updateInfo._id}`, updateInfo, {...options})
const setBook = (newBook, options) => axios.post(url, newBook, {...options})
const deleteBook = (id, options) => axios.delete(`${url}/${id}`, {...options})

export { getBooks, getBook, updateBook, setBook, deleteBook };
