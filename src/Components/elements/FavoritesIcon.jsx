import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarOutline } from "@fortawesome/free-regular-svg-icons";

import MouseoverInfo from "./MouseoverInfo";
import { updateBook, setBook } from "../../actions/bookshelf";
import SEARCH_TYPE from "../../constants/types/searchTypes";
import BOOKSHELF_TYPES from "../../constants/types/bookshelfTypes";
import {
  getFromShelf,
  createISBNObject,
  createBookObject,
} from "../../utilities";
import { useBookshelfContext, useAuthContext } from "../../hooks";

const FavoritesIcon = ({ bookshelfID, bookData }) => {
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
      const { isFavoriteFlag } = bookshelfItem;
      bookshelfItem.isFavoriteFlag = !isFavoriteFlag;
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
      bookshelfItem.isFavoriteFlag = true;
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
    <MouseoverInfo text="Favorites">
      <FontAwesomeIcon
        style={{
          cursor: "pointer",
          color: `${bookData.isFavoriteFlag ? "red" : "black"}`,
        }}
        icon={bookData.isFavoriteFlag ? faStar : faStarOutline}
        onClick={() => handleClick()}
      />
    </MouseoverInfo>
  );
};

export default FavoritesIcon;
