import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faListCheck } from "@fortawesome/free-solid-svg-icons";

import MouseoverInfo from "./MouseoverInfo";

import { useBookshelf } from "../../hooks";

const ToReadListIcon = ({ bookData }) => {
  const { isRead, toggleRead } = useBookshelf();

  const handleClick = async () => {
    toggleRead(bookData);
  };

  return (
    <MouseoverInfo text="To-Read List">
      <FontAwesomeIcon
        style={{
          cursor: "pointer",
          color: `${isRead(bookData.isbn) ? "red" : "black"}`,
        }}
        icon={faListCheck}
        // icon={bookData.isReadingListFlag ? faGift : faGiftOutline}
        onClick={() => handleClick()}
      />
    </MouseoverInfo>
  );
};

export default ToReadListIcon;
