import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarOutline } from "@fortawesome/free-regular-svg-icons";

import MouseoverInfo from "./MouseoverInfo";
import { updateBook, setBook } from "../../actions/bookshelf";
import SEARCH_TYPE from "../../constants/searchTypes";
import ACTIONS from "../../constants/actionTypes";
import { getFromShelf, createISBNObject, createBookObject, } from "../../utilities";
import { useBookshelfContext } from "../../hooks";

const FavoritesIcon = ({ bookshelfID, bookData }) => {
  const { API, state, dispatch } = useBookshelfContext();

  const handleClick = async () => {
    let bookshelfItem = getFromShelf(
      state.bookshelf,
      SEARCH_TYPE.BOOKSHELF_ID,
      bookshelfID
    );
    if (bookshelfItem) {
      const { isFavoriteFlag } = bookshelfItem;
      bookshelfItem.isFavoriteFlag = !isFavoriteFlag;
      dispatch({ type: ACTIONS.UPDATE_BOOKSHELF_ITEM, payload: bookshelfItem });
      await updateBook(bookshelfItem);
    } else {
      const isbnObj = createISBNObject(bookData.industryIdentifiers);
      bookshelfItem = await createBookObject(API, isbnObj);
      bookshelfItem.isFavoriteFlag = true;
      const newBookshelfItem = await setBook(bookshelfItem);
      dispatch({
        type: ACTIONS.CREATE_BOOKSHELF_ITEM,
        payload: newBookshelfItem,
      });
    }
  };

  return (
    <MouseoverInfo text="Favorites">
      <FontAwesomeIcon
        style={{ cursor: "pointer" }}
        icon={bookData.isFavoriteFlag ? faStar : faStarOutline}
        onClick={() => handleClick()}
      />
    </MouseoverInfo>
  );
};

export default FavoritesIcon;
