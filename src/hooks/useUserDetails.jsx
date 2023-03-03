import React from "react";

import { useUserContext } from "./";

const useUserDetails = () => {
  const { userDetails, dispatch: userDispatch } = useUserContext();
  return { userDetails };
};

export default useUserDetails;
