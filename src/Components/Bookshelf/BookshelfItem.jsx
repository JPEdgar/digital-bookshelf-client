import React from "react";

const BookshelfItem = ({ content }) => {
  console.log(content);
  return <div>{content.title}</div>;
};

export default BookshelfItem;
