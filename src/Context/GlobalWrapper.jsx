import { BrowserRouter } from "react-router-dom";

import { BookshelfProvider } from "./bookshelf/BookshelfContext";
import { AuthProvider } from "./auth/AuthContext";
import { UserProvider } from "./user/UserContext";
import { SocialProvider } from "./social/SocialContext";

const GlobalWrapper = ({ children }) => {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <UserProvider>
            <SocialProvider>
              <BookshelfProvider>{children}</BookshelfProvider>
            </SocialProvider>
          </UserProvider>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
};

export default GlobalWrapper;
