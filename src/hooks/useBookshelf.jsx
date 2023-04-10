import React from "react";

import useBookshelfContext from "./context/useBookshelfContext";

const useBookshelf = () => {
  const { bookshelfState: bookshelf, dispatch: bookshelfDispatch } =
    useBookshelfContext();
  return { bookshelf, bookshelfDispatch };
};

export default useBookshelf;
