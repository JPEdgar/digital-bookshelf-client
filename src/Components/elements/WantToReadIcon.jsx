import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faListCheck } from "@fortawesome/free-solid-svg-icons";

import MouseoverInfo from "./MouseoverInfo";

import { useBookshelf } from "../../hooks";

const WantToReadIcon = ({ bookData }) => {
  const { isWantToRead, toggleWantToRead, isLoadingFlag } = useBookshelf();

  const handleClick = async () => {
    toggleWantToRead(bookData);
  };

  return (
    <MouseoverInfo text="Want-to-Read">
      <FontAwesomeIcon
        style={{
          cursor: `${isLoadingFlag} ? "wait" : "pointer"`,
          color: `${isWantToRead(bookData.isbn) ? "red" : "black"}`,
        }}
        icon={faListCheck}
        // icon={bookData.isReadingListFlag ? faGift : faGiftOutline}
        onClick={() => handleClick()}
      />
    </MouseoverInfo>
  );
};

export default WantToReadIcon;
