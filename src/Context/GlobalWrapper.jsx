import { BrowserRouter } from "react-router-dom";

import { AuthProvider } from "./auth/AuthContext";
import { UserProvider } from "./user/UserContext";

const GlobalWrapper = ({ children }) => {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <UserProvider>{children}</UserProvider>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
};

export default GlobalWrapper;
