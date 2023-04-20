import { BrowserRouter } from "react-router-dom";

import { AuthProvider } from "./auth/AuthContext";
import { UserProvider } from "./user/UserContext";
import { BookshelfProvider } from "./bookshelf/BookshelfContext";
import { SearchProvider } from "./search/SearchContext";

const GlobalWrapper = ({ children }) => {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <SearchProvider>
            <UserProvider>
              <BookshelfProvider>{children}</BookshelfProvider>
            </UserProvider>
          </SearchProvider>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
};

export default GlobalWrapper;
