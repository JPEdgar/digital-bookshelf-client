import { getFriendsBookshelf } from "../actions/bookshelf";

const useFriendBookshelf = () => {
  const getFriendBookshelf = async (userID) => {
    const { data } = await getFriendsBookshelf(userID);
    const { contents } = data;
    return contents;
  };

  return { getFriendBookshelf };
};

export default useFriendBookshelf;
