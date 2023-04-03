import { getUserDetails } from "../actions/user";

const useGetFriendDetails = () => {
  const getFriendDetails = async (userID) => {
    const { data } = await getUserDetails(userID);
    return data;
  };

  return { getFriendDetails };
};

export default useGetFriendDetails;
