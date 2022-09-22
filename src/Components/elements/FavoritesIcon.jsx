import React, { useCallback } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarOutline } from "@fortawesome/free-regular-svg-icons";

const FavoritesIcon = ({ toggle, onClick = () => {} }) => {
  const returnClick = useCallback(() => onClick(), [onClick]);
  
  return (
    <FontAwesomeIcon
      style={{ cursor: "pointer" }}
      icon={toggle ? faStar : faStarOutline}
      onClick={returnClick}
    />
  );
};

export default FavoritesIcon;
