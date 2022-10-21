import { BrowserRouter } from "react-router-dom";

import { BookshelfProvider } from "./bookshelf/BookshelfContext";
import { AuthProvider } from "./auth/AuthContext";

const GlobalWrapper = ({ children }) => {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <BookshelfProvider>{children}</BookshelfProvider>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
};

export default GlobalWrapper;
