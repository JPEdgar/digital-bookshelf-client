import React, { useState, useEffect } from "react";

import FriendsBookshelf from "./FriendsBookshelf";
import { useUserDetails, useFriendBookshelf } from "../../hooks";

const FriendFocus = () => {
  const { userDetails } = useUserDetails();
  const { getFriendBookshelf } = useFriendBookshelf();
  const [friendsBookshelf, setFriendsBookshelf] = useState([]);

  const { friendFocus } = userDetails;

  useEffect(() => {
    if (!friendFocus) return

    const getShelf = async () => {
      const bookshelf = await getFriendBookshelf(friendFocus?.userID);
      if (bookshelf) setFriendsBookshelf(bookshelf);
    };

    getShelf();
  }, [friendFocus]);



  // logging in and out doesn't change the bookshelf.  
  // this may also effect friends.
  useEffect(() => {
    console.log(friendsBookshelf);
  }, [friendsBookshelf]);

  return (
    <>
      {friendFocus && (
        <>
          <div>{friendFocus.handle}</div>
          <FriendsBookshelf bookshelf={friendsBookshelf} />
        </>
      )}
    </>
  );
};

export default FriendFocus;
