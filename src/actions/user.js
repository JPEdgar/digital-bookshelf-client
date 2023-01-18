import * as api from "../api";

const createUserDetails = async (email, password) => {
  try {
    const data = await api.setLogIn(email, password);
    return data;
  } catch (error) {
    console.log(error);
  }
};

const getUserDetails = async (email) => {
  try {
    const { data } = await api.getUserDetails(email);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export { createUserDetails, getUserDetails };
