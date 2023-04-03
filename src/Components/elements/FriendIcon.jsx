import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserGroup } from "@fortawesome/free-solid-svg-icons";

import MouseoverInfo from "./MouseoverInfo";

const FriendIcon = () => {
  return (
    <MouseoverInfo text={"Friends List"} direction="bottom">
      <FontAwesomeIcon
        style={{
          cursor: "pointer",
        }}
        icon={faUserGroup}
      />
    </MouseoverInfo>
  );
};

export default FriendIcon;
