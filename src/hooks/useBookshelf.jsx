import React from "react";

import useBookshelfContext from "./context/useBookshelfContext";

const useBookshelf = () => {
  const {bookshelfState, dispatch: bookshelfDispatch} = useBookshelfContext()
  return {bookshelfState , bookshelfDispatch};
};

export default useBookshelf;
