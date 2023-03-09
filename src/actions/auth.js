import * as api from "../api";

const logIn = async (email, password) => {
  try {
    const data = await api.login(email, password);
    return data;
  } catch (error) {
    // console.log(error);
    return error.response.data;
  }
};

const signUp = async (email, password, handle) => {
  try {
    const data = await api.signUp(email, password, handle);
    return data;
  } catch (error) {
    // console.log(error);
    return error.response.data;
  }
};

const deleteAccount = async (email, token) => {
  try {
    const data = await api.deleteAccount(email, token);
    return data;
  } catch (error) {
    // console.log(error);
    return error.response.data;
  }
};

const updateEmail = async (email, password, newEmail, token) => {
  try {
    const data = await api.updateEmail(email, password, newEmail, token);
    return data;
  } catch (error) {
    // console.log(error);
    return error.response.data;
  }
};

const updatePassword = async (email, password, newPassword, token) => {
  try {
    const data = await api.updatePassword(email, password, newPassword, token);
    return data;
  } catch (error) {
    // console.log(error);
    return error.response.data;
  }
};



export { logIn, signUp, deleteAccount, updatePassword, updateEmail };
