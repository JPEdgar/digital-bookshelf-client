import { BrowserRouter } from "react-router-dom";

import { BookshelfProvider } from "./bookshelf/BookshelfContext";

const GlobalWrapper = ({ children }) => {
  return (
    <>
      <BrowserRouter>
        <BookshelfProvider>{children}</BookshelfProvider>
      </BrowserRouter>
    </>
  );
};

export default GlobalWrapper;
