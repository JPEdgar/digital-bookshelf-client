import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarOutline } from "@fortawesome/free-regular-svg-icons";

import MouseoverInfo from "./MouseoverInfo";

import { useBookshelf } from "../../hooks";

const FavoritesIcon = ({ bookData }) => {
  const { isFavorite, toggleFavorite } = useBookshelf();

  const handleClick = async () => {
    toggleFavorite(bookData);
  };

  return (
    <MouseoverInfo text="Favorites">
      <FontAwesomeIcon
        style={{
          cursor: "pointer",
          color: `${isFavorite(bookData.isbn) ? "red" : "black"}`,
        }}
        icon={isFavorite(bookData.isbn) ? faStar : faStarOutline}
        onClick={() => handleClick()}
      />
    </MouseoverInfo>
  );
};

export default FavoritesIcon;
