import { useContext } from "react";

import { SocialContext } from "../../context/social/SocialContext";

const useSocialContext = () => {
  const context = useContext(SocialContext);

  if (!context) throw Error("Context error - useSocialContext out-of-scope.");

  return context;
};

export default useSocialContext;
