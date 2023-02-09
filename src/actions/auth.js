import * as api from "../api";

const logIn = async (email, password) => {
  try {
    const data = await api.setLogIn(email, password);
    return data;
  } catch (error) {
    console.log(error);
  }
};

const signUp = async (email, password) => {
  try {
    const data = await api.setSignUp(email, password);
    return data;
  } catch (error) {
    console.log(error);
  }
};

const deleteAccount = async (email, token) => {
  try {
    const data = await api.deleteAccount(email, token);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export { logIn, signUp, deleteAccount };
