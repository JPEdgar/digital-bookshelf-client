import * as api from "../api";

const getUserDetails = async (query) => {
  try {
    const data = await api.getUserDetails(query);
    return data;
  } catch (error) {
    console.log(error);
  }
};

const updateUserDetails = async (updates, token) => {
  try {
    const data = await api.updateUserDetails(updates, token);
    return data;
  } catch (error) {
    console.log(error);
  }
};

const removeFriend = async (userID, friendID, token) => {
  try {
    const data = await api.removeFriend(userID, friendID, token);
    return data;
  } catch (error) {
    console.log(error);
  }
};

const findFriend = async (query) => {
  try {
    const data = await api.findFriend(query);
    return data;
  } catch (error) {
    console.log(error);
  }
};



export { getUserDetails, updateUserDetails, removeFriend, findFriend };
