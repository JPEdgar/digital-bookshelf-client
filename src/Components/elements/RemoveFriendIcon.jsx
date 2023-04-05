import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserMinus } from "@fortawesome/free-solid-svg-icons";

import { useRemoveFriend } from "../../hooks";
import MouseoverInfo from "./MouseoverInfo";

const RemoveFriendIcon = ({ userID, friendID, token }) => {
  // console.log("Remove Friend Icon")
  // console.log({ userID, friendID, token });

  const { removeFriend } = useRemoveFriend();
  return (
    <MouseoverInfo text={"Remove Friend"}>
      <FontAwesomeIcon
        style={{
          cursor: "pointer",
        }}
        icon={faUserMinus}
        onClick={() => removeFriend(userID, friendID, token)}
      />
    </MouseoverInfo>
  );
};

export default RemoveFriendIcon;
