import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCheck } from "@fortawesome/free-solid-svg-icons";

import { useAddFriend } from "../../hooks";
import MouseoverInfo from "./MouseoverInfo";

const AcceptFriendIcon = ({ userID, friendID, token }) => {
  // console.log("Accept Friend Icon");
  // console.log({ userID, friendID, token });
  const { addFriend } = useAddFriend();
  return (
    <MouseoverInfo text={"Accept Friend Request"}>
      <FontAwesomeIcon
        style={{
          cursor: "pointer",
        }}
        icon={faUserCheck}
        onClick={() => addFriend(userID, friendID, token)}
      />
    </MouseoverInfo>
  );
};

export default AcceptFriendIcon;
