import axios from "axios";

const BASE_URL = "http://localhost:4000/api";
const bookshelfURL = `${BASE_URL}/bookshelf`;
const authURL = `${BASE_URL}/auth`;
const userURL = `${BASE_URL}/user`;

const getBooks = (options = {}) => axios.get(bookshelfURL, { ...options });
const getBook = (id, options = {}) =>
  axios.get(`${bookshelfURL}/${id}`, { ...options });
const updateBook = (updateInfo, options = {}) =>
  axios.patch(`${bookshelfURL}/${updateInfo._id}`, updateInfo, { ...options });
const setBook = (newBook, options = {}) =>
  axios.post(bookshelfURL, newBook, { ...options });
const deleteBook = (id, options = {}) =>
  axios.delete(`${bookshelfURL}/${id}`, { ...options });

const setLogIn = async (email = "", password = "") =>
  axios.post(`${authURL}/login`, { email, password });
const setSignUp = async (email = "", password = "") =>
  axios.post(`${authURL}/signup`, { email, password });
const setAuthDetail = async (email = "", id = "", token = "") =>
  axios.post(
    userURL,
    { email, id },
    { headers: { Authorization: `bearer ${token}` } }
  );

const getUserDetails = async (email = "") =>
  axios.get(userURL, { params: { email } });
const setNewUserDetails = async (data = {}, token = "") => {
  // console.log("api setNewUserDetails {data, token} = ", { data, token });
  axios.post(userURL, data, { headers: { Authorization: `bearer ${token}` } });
};
const updateUserDetails = async (data = {}, token = "") => {
  // console.log("api updateUserDetails {data, token} = ", {data, token})
  axios.patch(`${userURL}/${data._userID}`, data, {
    headers: { Authorization: `bearer ${token}` },
  });
};

export {
  getBooks,
  getBook,
  updateBook,
  setBook,
  deleteBook,
  setLogIn,
  setSignUp,
  setAuthDetail,
  getUserDetails,
  setNewUserDetails,
  updateUserDetails,
};
