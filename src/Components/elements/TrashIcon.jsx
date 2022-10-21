import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

import MouseoverInfo from "./MouseoverInfo";
import { deleteBook } from "../../actions/bookshelf";
import SEARCH_TYPE from "../../constants/searchTypes";
import ACTIONS from "../../constants/actionTypes";
import { getFromShelf } from "../../utilities";
import { useBookshelfContext, useAuthContext } from "../../hooks";

const TrashIcon = ({ bookshelfID }) => {
  const { bookshelfState, dispatch } = useBookshelfContext();
  const { userState } = useAuthContext();
  const { user } = userState;

  const handleClick = async (bookshelfID) => {
    let bookshelfItem = getFromShelf(
      bookshelfState.bookshelf,
      SEARCH_TYPE.BOOKSHELF_ID,
      bookshelfID
    );
    if (bookshelfItem) {
      dispatch({
        type: ACTIONS.DELETE_BOOKSHELF_ITEM,
        payload: bookshelfItem._id,
      });
      await deleteBook(bookshelfItem._id, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
    }
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
