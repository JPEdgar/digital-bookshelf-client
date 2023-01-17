import React, {createContext} from "react";

const SocialContext = createContext();

const SocialProvider = ({ children }) => {
  

  return (
    <SocialContext.Provider value={{  }}>
      {children}
    </SocialContext.Provider>
  );
};

const INITIALIZE_STATE = {
    friends: []
};

export { SocialContext, SocialProvider };
