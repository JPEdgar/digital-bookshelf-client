import { BookshelfProvider } from "./Bookshelf/BookshelfContext";

const GlobalWrapper = ({ children }) => {
  return (
    <>
      <BookshelfProvider>{children}</BookshelfProvider>
    </>
  );
};

export default GlobalWrapper;
