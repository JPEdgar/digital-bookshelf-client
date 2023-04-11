import React from "react";

import BookshelfItem from "./BookshelfItem";

import { useBookshelf } from "../../hooks";

const Bookshelf = () => {
  const { bookshelf } = useBookshelf();

  React.useEffect(() => console.log(bookshelf.contents), [bookshelf]);

  return (
    <>
      {bookshelf?.contents?.map((item) => (
        <BookshelfItem key={`bookshelf-item-${item._id}`} content={item} />
      ))}
    </>
  );
};

export default Bookshelf;
