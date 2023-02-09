import axios from "axios";

const BASE_URL = "http://localhost:4000/api";
const authURL = `${BASE_URL}/auth`;
const userURL = `${BASE_URL}/user`;

// auth
const setLogIn = async (email = "", password = "") =>
  axios.post(`${authURL}/login`, { email, password });
const setSignUp = async (email = "", password = "") =>
  axios.post(`${authURL}/signup`, { email, password });
const deleteAccount = async (email = "", token = "") =>
  axios.delete(`${authURL}/delete`, {
    headers: { Authorization: `bearer ${token}` },
    data: { email },
  });

// user
const createNewUser = async (email = "", id = "", handle = "") =>
  axios.post(userURL, { email, id, handle });
const deleteUserDetails = async (email = "", token = "") =>
axios.delete(`${userURL}/delete`, {
  headers: { Authorization: `bearer ${token}` },
  data: { email },
});

export { setLogIn, setSignUp, deleteAccount, createNewUser , deleteUserDetails};
