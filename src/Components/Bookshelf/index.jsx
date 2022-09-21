import React, { useEffect, useState } from "react";

import { getBookDetails } from "../../utilities";
import { useBookshelfContext } from "../../Context/Bookshelf/BookshelfContext";

const Bookshelf = () => {
  const [bookshelfList, setBookshelfList] = useState([]);
  const { bookshelf, API } = useBookshelfContext();

  useEffect(() => {
    const bookshelfList = bookshelf.map((book) => getBookDetails(API, book.id));
  }, [bookshelf]);

  return <></>;
};

export default Bookshelf;
