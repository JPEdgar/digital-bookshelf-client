import { BrowserRouter } from "react-router-dom";

import { AuthProvider } from "./auth/AuthContext";
import { UserProvider } from "./user/UserContext";
import { BookshelfProvider } from "./bookshelf/BookshelfContext";

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
