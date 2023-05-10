import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

import MouseoverInfo from "./MouseoverInfo";

import {useBookshelf} from "../../hooks";

const TrashIcon = ({ bookData }) => {
    const {removeFromBookshelf, isLoadingFlag} = useBookshelf()

  const handleClick = () => {
    removeFromBookshelf(bookData)
  };

  return (
    <MouseoverInfo text="Delete">
      <FontAwesomeIcon
        style={{ cursor: `${isLoadingFlag} ? "wait" : "pointer"`, }}
        icon={faTrash}
        onClick={() => handleClick()}
      />
    </MouseoverInfo>
  );
};

export default TrashIcon;
