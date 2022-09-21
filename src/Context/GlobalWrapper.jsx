import { BrowserRouter } from "react-router-dom";

import { BookshelfProvider } from "./Bookshelf/BookshelfContext";

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
