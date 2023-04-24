import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGift } from "@fortawesome/free-solid-svg-icons";

import MouseoverInfo from "./MouseoverInfo";

import { useBookshelf } from "../../hooks";

const WishListIcon = ({ bookData }) => {
    const { isOnWishList, toggleWishList } = useBookshelf();

    const handleClick = async () => {
        toggleWishList(bookData);
      };

  return (
    <MouseoverInfo text="Wish List">
      <FontAwesomeIcon
        style={{
          cursor: "pointer",
          color: `${isOnWishList(bookData.isbn) ? "red" : "black"}`,
        }}
        icon={faGift}
        // icon={bookData.isWishListFlag ? faGift : faGiftOutline}
        onClick={() => handleClick()}
      />
    </MouseoverInfo>
  );
};

export default WishListIcon;