import axios from "axios";

const BASE_URL = "http://localhost:4000/api";
const authURL = `${BASE_URL}/auth`;
const userURL = `${BASE_URL}/user`;
const socialURL = `${BASE_URL}/social`;

// auth
const signUp = async (email = "", password = "", handle = "") =>
  axios.post(`${authURL}/signup`, { email, password, handle });
const login = async (email = "", password = "") =>
  axios.post(`${authURL}/login`, { email, password });
const updatePassword = async ( email = "", password = "", newPassword = "", token = "" ) =>
  axios.patch( `${authURL}/update-password`,
    { headers: { Authorization: `bearer ${token}` } },
    { email, password, newPassword }
  );
const updateEmail = async ( email = "", password = "", newEmail = "", token = "" ) => {
  return axios.patch( `${authURL}/update-email`,
    { email, password, newEmail },
    { headers: { Authorization: `bearer ${token}` } }
  );
};
const deleteAccount = async (email) =>
  axios.delete(`${authURL}/delete`, { email });

// user
const createNewUser = async (email = "", id = "", handle = "") =>
  axios.post(userURL, { email, id, handle });
const getUserDetails = async (query) =>
  axios.get(userURL, { params: { ...query } });
const updateUserDetails = async (updates, token) =>
  axios.patch(userURL, {
    headers: { Authorization: `bearer ${token}` },
    data: updates,
  });

// social
const sendFriendRequest = async (userID = "", friendID = "") =>
  axios.patch(`${socialURL}/send-friend-request`, { userID, friendID });
const acceptFriendRequest = async (userID = "", friendID = "") =>
  axios.patch(`${socialURL}/accept-friend-request`, { userID, friendID });
const removeFriend = async (userID = "", friendID = "") =>
  axios.patch(`${socialURL}/remove-friend`, { userID, friendID });

export {
  signUp,
  login,
  updatePassword,
  updateEmail,
  getUserDetails,
  deleteAccount,
  createNewUser,
  sendFriendRequest,
  acceptFriendRequest,
  removeFriend,
  updateUserDetails,
};
