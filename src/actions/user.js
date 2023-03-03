import * as api from "../api";

const getUserDetails = async (query) => {
  try {
    const data = await api.getUserDetails(query);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export { getUserDetails };
