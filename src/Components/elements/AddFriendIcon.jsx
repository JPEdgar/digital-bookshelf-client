import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";

// import { useRemoveFriend } from "../../hooks";
import MouseoverInfo from "./MouseoverInfo";

const AddFriendIcon = ({ userID, friendID, token }) => {
  // console.log({ userID, friendID, token });
//   const { removeFriend } = useRemoveFriend();
  return (
    <MouseoverInfo text={"Add Friend"}>
      <FontAwesomeIcon
        style={{
          cursor: "pointer",
        }}
        icon={faUserPlus}
        // onClick={() => removeFriend(userID, friendID, token)}
      />
    </MouseoverInfo>
  );
};

export default AddFriendIcon;
