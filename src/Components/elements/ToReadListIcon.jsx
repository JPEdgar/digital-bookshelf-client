import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faListCheck } from "@fortawesome/free-solid-svg-icons";

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

const ToReadListIcon = ({ bookshelfID, bookData }) => {
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
      const { isReadingListFlag } = bookshelfItem;
      bookshelfItem.isReadingListFlag = !isReadingListFlag;
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
      bookshelfItem.isReadingListFlag = true;
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
    <MouseoverInfo text="To-Read List">
      <FontAwesomeIcon
        style={{
          cursor: "pointer",
          color: `${bookData.isReadingListFlag ? "red" : "black"}`,
        }}
        icon={faListCheck}
        // icon={bookData.isReadingListFlag ? faGift : faGiftOutline}
        onClick={() => handleClick()}
      />
    </MouseoverInfo>
  );
};

export default ToReadListIcon;
