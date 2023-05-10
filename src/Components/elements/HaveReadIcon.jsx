import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlasses } from "@fortawesome/free-solid-svg-icons";

import MouseoverInfo from "./MouseoverInfo";

import { useBookshelf } from "../../hooks";

const HaveReadIcon = ({ bookData }) => {
  const { isHaveRead, toggleHaveRead, isLoadingFlag } = useBookshelf();

  const handleClick = async () => {
    toggleHaveRead(bookData);
  };

  return (
    <MouseoverInfo text="Have Read">
      <FontAwesomeIcon
        style={{
          cursor: `${isLoadingFlag} ? "wait" : "pointer"`,
          color: `${isHaveRead(bookData.isbn) ? "red" : "black"}`,
        }}
        icon={faGlasses}
        // icon={bookData.isHaveReadFlag ? faGift : faGiftOutline}
        onClick={() => handleClick()}
      />
    </MouseoverInfo>
  );
};

export default HaveReadIcon;
