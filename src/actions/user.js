import * as api from "../api";

const createUserDetails = async (email, password) => {
  // console.log("user actions > createuserDetails -- email = ", email);
  try {
    const data = await api.setLogIn(email, password);
    return data;
  } catch (error) {
    console.log(error);
  }
};

const getUserDetails = async (email) => {
  // console.log("user actions > getUserDetails -- email = ", email);
  try {
    const { data } = await api.getUserDetails(email);
    return data;
  } catch (error) {
    console.log(error);
  }
};

const setNewUserDetails = async (data, token) => {
  // console.log("user actions > setNewUserDetails -- data = ", data);
  try {
    await api.setNewUserDetails(data, token);
  } catch (error) {
    console.log(error);
  }
};

const updateUserDetails = async (data, token) => {
  // console.log("user actions > updateUserDetails -- data = ", data);
  try {
    // console.log("actions/users/updateUserDetails {data, token} = ", {data, token});
    await api.updateUserDetails(data, token);
  } catch (error) {
    console.log(error);
  }
};

export {
  createUserDetails,
  getUserDetails,
  setNewUserDetails,
  updateUserDetails,
};
