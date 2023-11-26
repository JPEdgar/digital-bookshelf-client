import React, { useEffect, useState } from "react";

import { Form, Dropdown, Stack, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import { cropString } from "../../utilities";
import ShowMoreIcon from "./ShowMoreIcon";
import FavoritesIcon from "./FavoritesIcon";
import WishListIcon from "./WishListIcon";
import WantToReadIcon from "./WantToReadIcon";
import HaveReadIcon from "./HaveReadIcon";
import TrashIcon from "./TrashIcon";

import {
  useFindBook,
  useBookshelf,
  useSearchDetails,
  useAuthDetails,
} from "../../hooks";

import { verifyBook } from "../../utilities";

const BookSearchItem = ({ bookData, setOpenSearchFlag, setSearchMax }) => {
  const { authDetails } = useAuthDetails();

  const { setBookFocus, isOnBookshelf, isLoadingFlag } = useBookshelf();
  const navigate = useNavigate();
  const [verifyBookFlag, setVerifyBookFlag] = useState(false);

  const handleClick = (bookData) => {
    setBookFocus(bookData);
    setOpenSearchFlag(false);
    navigate("/book-details");
  };

  useEffect(() => {
    const verifyFlag = verifyBook(bookData)
    if (!verifyFlag) setSearchMax(curr => curr + 1)
    setVerifyBookFlag(verifyFlag);
  }, [bookData]);

  return (
    verifyBookFlag && (
      <Dropdown.Item
        style={{ cursor: `${isLoadingFlag} ? "wait" : "pointer"` }}
      >
        <Stack direction="horizontal" gap={1} className="w-100">
          <Image
            src={bookData.coversList.small}
            height="100px"
            onClick={() => handleClick(bookData)}
          />
          <Stack
            className="ms-1"
            style={{ width: "15em" }}
            onClick={() => handleClick(bookData)}
          >
            <div>{cropString(bookData.title, 25)}</div>
            <div>{cropString(bookData.subtitle, 25)}</div>
            <div>By: {cropString(bookData.authorString, 25)}</div>
          </Stack>

          <Stack gap={1} className="ms-1" style={{ fontSize: "0.75rem" }}>
            {authDetails.email && (
              <>
                <FavoritesIcon bookData={bookData} />
                <WishListIcon bookData={bookData} />
                <WantToReadIcon bookData={bookData} />
                <HaveReadIcon bookData={bookData} />
                {isOnBookshelf(bookData.isbn) && (
                  <TrashIcon bookData={bookData} />
                )}
              </>
            )}
          </Stack>
        </Stack>
      </Dropdown.Item>
    )
  );
};

export default BookSearchItem;
