import React from "react";

import useUserContext from "./context/useUserContext";

const useUserDetails = () => {
  const { userDetails } = useUserContext();
  return { userDetails };
};

export default useUserDetails;
