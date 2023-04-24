import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

import MouseoverInfo from "./MouseoverInfo";

import {useBookshelf} from "../../hooks";

const TrashIcon = ({ bookshelfID }) => {
  const handleClick = () => {
    //
  };

  return (
    <MouseoverInfo text="Delete">
      <FontAwesomeIcon
        style={{ cursor: "pointer" }}
        icon={faTrash}
        onClick={() => handleClick(bookshelfID)}
      />
    </MouseoverInfo>
  );
};

export default TrashIcon;
