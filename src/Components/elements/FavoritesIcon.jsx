import React, { useCallback } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarOutline } from "@fortawesome/free-regular-svg-icons";

const FavoritesIcon = ({ toggle, onClick = () => {}, isFavoriteFlag = false }) => {
  const returnClick = useCallback(() => onClick(), [onClick]);
  
  const handleClick = () => {
    console.log("here")
  }

  return (
    <FontAwesomeIcon
      style={{ cursor: "pointer", backgroundColor: "red" }}
      icon={isFavoriteFlag ? faStar : faStarOutline}
      onClick={() => handleClick()}
    />
  );
};

export default FavoritesIcon;
