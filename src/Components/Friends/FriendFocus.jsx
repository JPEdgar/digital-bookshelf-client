import React, { useEffect } from "react";

import { useUserDetails } from "../../hooks";
const FriendFocus = () => {
  const { userDetails } = useUserDetails();
  const { friendFocus } = userDetails;

  // useEffect(() => {
  //     console.log("userDetails changed - userDetails = ")
  //     console.log(userDetails)
  // }, [userDetails])

  useEffect(() => console.log("friendFocus = ", friendFocus), [friendFocus]);

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
