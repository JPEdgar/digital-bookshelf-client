import React from "react";

import { useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";


import MouseoverInfo from "./MouseoverInfo";

const ShowMoreIcon = ({loc="/", setToggleDropdownFlag }) => {
    const navigate = useNavigate();
  // console.log("Remove Friend Icon")
  // console.log({ userID, friendID, token });

  const handleClick = () => {
    //
    console.log("show more")
    navigate(loc)
    setToggleDropdownFlag(false)
  }

  return (
    <MouseoverInfo text={"Show More"}>
      <FontAwesomeIcon
      className="w-100 justify-content-end"
        style={{
            backgroundColor: "blue",
            color: "white",
          cursor: "pointer",
          maxHeight: "30px"
        }}
        icon={faAngleDown}
        onClick={() => handleClick()}
      />
    </MouseoverInfo>
  );
};

export default ShowMoreIcon;
