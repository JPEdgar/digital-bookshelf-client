import React from "react";

import useAuthContext from "./context/useAuthContext";

const useAuthDetails = () => {
  const { authState: authDetails } = useAuthContext();
  return { authDetails };
};

export default useAuthDetails;
