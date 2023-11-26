import React from "react";
import {Link} from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";

import MouseoverInfo from "./MouseoverInfo";

import { useBookshelf } from "../../hooks";

const FilterIcon = ({filterOption}) => {
  const { isLoadingFlag } = useBookshelf();

  const handleClick = async () => {
    // friend-search
    // book-search
  };

  return (
    <MouseoverInfo text="Advanced Search">
        <Link to={`/${filterOption}`}>

      <FontAwesomeIcon
        style={{
            cursor: `${isLoadingFlag} ? "wait" : "pointer"`,
            color: "black",
        } }
        className="ms-1 me-2"
        icon={faFilter}
        onClick={() => handleClick()}
        />
        </Link>
    </MouseoverInfo>
  );
};

export default FilterIcon;
