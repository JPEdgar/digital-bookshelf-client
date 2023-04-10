import React, { useEffect } from "react";

import { useUserDetails } from "../../hooks";
const FriendFocus = () => {
  const { userDetails } = useUserDetails();
  const { friendFocus } = userDetails;

  return (
    <>
      {friendFocus && (
        <>
          <div>{friendFocus.handle}</div>
        </>
      )}
    </>
  );
};

export default FriendFocus;
