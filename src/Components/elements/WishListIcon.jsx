import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGift } from "@fortawesome/free-solid-svg-icons";

import MouseoverInfo from "./MouseoverInfo";
import { updateBook, setBook } from "../../actions/bookshelf";
import SEARCH_TYPE from "../../constants/searchTypes";
import BOOKSHELF_TYPES from "../../constants/bookshelfTypes";
import {
  getFromShelf,
  createISBNObject,
  createBookObject,
} from "../../utilities";
import { useBookshelfContext, useAuthContext } from "../../hooks";

const WishListIcon = ({ bookshelfID, bookData }) => {
  const { API, bookshelfState, dispatch } = useBookshelfContext();
  const { userState } = useAuthContext();
  const { user } = userState;

  const handleClick = async () => {
    let bookshelfItem = getFromShelf(
      bookshelfState.bookshelf,
      SEARCH_TYPE.BOOKSHELF_ID,
      bookshelfID
    );

    if (bookshelfItem) {
      const { isWishListFlag } = bookshelfItem;
      bookshelfItem.isWishListFlag = !isWishListFlag;
      dispatch({
        type: BOOKSHELF_TYPES.UPDATE_BOOKSHELF_ITEM,
        payload: bookshelfItem,
      });
      await updateBook(bookshelfItem, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
    } else {
      const isbnObj = createISBNObject(bookData.industryIdentifiers);
      bookshelfItem = await createBookObject(API, isbnObj);
      bookshelfItem.isWishListFlag = true;
      const newBookshelfItem = await setBook(bookshelfItem, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      dispatch({
        type: BOOKSHELF_TYPES.CREATE_BOOKSHELF_ITEM,
        payload: newBookshelfItem,
      });
    }
  };

  return (
    <MouseoverInfo text="Wish List">
      <FontAwesomeIcon
        style={{
          cursor: "pointer",
          color: `${bookData.isWishListFlag ? "red" : "black"}`,
        }}
        icon={faGift}
        // icon={bookData.isWishListFlag ? faGift : faGiftOutline}
        onClick={() => handleClick()}
      />
    </MouseoverInfo>
  );
};

export default WishListIcon;
