import React from "react";

import FriendsBook from "./FriendsBook";

const FriendsBookshelf = ({ bookshelf }) => {
  // console.log(bookshelf);
  return (
    <>
      {bookshelf.map((book, index) => {
        return index < 3 && <FriendsBook key={index} book={book}></FriendsBook>;
      })}
    </>
  );
};

export default FriendsBookshelf;
