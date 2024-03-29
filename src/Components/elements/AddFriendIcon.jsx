import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";

import { useAddFriend } from "../../hooks";
import MouseoverInfo from "./MouseoverInfo";

const AddFriendIcon = ({ userID, friendID, token }) => {
  // console.log("Add Friend Icon");
  // console.log({ userID, friendID, token });
  const { addFriend } = useAddFriend();

  return (
    <MouseoverInfo text={"Add Friend"}>
      <FontAwesomeIcon
        style={{
          cursor: "pointer",
        }}
        icon={faUserPlus}
        onClick={() => addFriend(userID, friendID, token)}
      />
    </MouseoverInfo>
  );
};

export default AddFriendIcon;
