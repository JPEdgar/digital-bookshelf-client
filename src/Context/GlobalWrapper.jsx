import { BrowserRouter } from "react-router-dom";

import { AuthProvider } from "./auth/AuthContext";


const GlobalWrapper = ({ children }) => {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
        {children}
        </AuthProvider>
      </BrowserRouter>
    </>
  );
};

export default GlobalWrapper;
