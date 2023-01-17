import { BrowserRouter } from "react-router-dom";

import { BookshelfProvider } from "./bookshelf/BookshelfContext";
import { AuthProvider } from "./auth/AuthContext";
import { UserProvider } from "./user/UserContext";

const GlobalWrapper = ({ children }) => {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <UserProvider>
            <BookshelfProvider>{children}</BookshelfProvider>
          </UserProvider>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
};

export default GlobalWrapper;
