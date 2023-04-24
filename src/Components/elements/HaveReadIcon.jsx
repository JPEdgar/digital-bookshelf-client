import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlasses } from "@fortawesome/free-solid-svg-icons";

import MouseoverInfo from "./MouseoverInfo";


import { } from "../../hooks";

const HaveReadIcon = ({ bookshelfID, bookData }) => {


  const handleClick = async () => {
  //
  };

  return (
    <MouseoverInfo text="Have Read">
      <FontAwesomeIcon
        style={{
          cursor: "pointer",
          color: `${bookData.isHaveReadFlag ? "red" : "black"}`,
        }}
        icon={faGlasses}
        // icon={bookData.isHaveReadFlag ? faGift : faGiftOutline}
        onClick={() => handleClick()}
      />
    </MouseoverInfo>
  );
};

export default HaveReadIcon;