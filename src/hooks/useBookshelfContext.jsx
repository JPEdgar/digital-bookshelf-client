import { useContext } from "react";

import { BookshelfContext } from "../Context/Bookshelf/BookshelfContext";

const useBookshelfContext = () => {
  const context = useContext(BookshelfContext);

  if (!context)
    throw Error("Context error - useBookshelfContext out-of-scope.");

  return context;
};

export default useBookshelfContext;
