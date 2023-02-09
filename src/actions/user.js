import * as api from "../api";

const createNewUser = async (email, id, handle) => {
  try {
    const data = await api.createNewUser(email, id, handle);
    return data;
  } catch (error) {
    console.log(error);
  }
};

const deleteUserDetails = async (email, token) => {
  console.log({email, token})
  try {
    const data = await api.deleteUserDetails(email, token);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export { createNewUser, deleteUserDetails };
