import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBan } from "@fortawesome/free-solid-svg-icons";

// import { useRemoveFriend } from "../../hooks";
import MouseoverInfo from "./MouseoverInfo";

const BlockUserIcon = ({ userID, friendID, token }) => {
  // console.log("Block User Icon");
  // console.log({ userID, friendID, token });
  //   const { removeFriend } = useRemoveFriend();
  return (
    <MouseoverInfo text={"Block User"}>
      <FontAwesomeIcon
        style={{
          cursor: "pointer",
        }}
        icon={faBan}
        // onClick={() => addFriend(userID, friendID, token)}
      />
    </MouseoverInfo>
  );
};

export default BlockUserIcon;
