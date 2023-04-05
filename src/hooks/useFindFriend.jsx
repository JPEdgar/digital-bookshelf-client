import { findFriend as findFriendAction } from "../actions/user";

const useFindFriend = () => {
  const findFriend = async (query) => {

    const { data } = await findFriendAction(query);

    return data;
  };

  return { findFriend };
};

export default useFindFriend;
