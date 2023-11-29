import React from "react";

import { useSearchDetails } from "../../hooks";
import BookDetails from "../elements/BookDetails";
import BookSearch from "./BookSearch";

const ExtendedBookSearch = () => {
  const { bookSearchList } = useSearchDetails();

  return (
    <>
    <BookSearch/>
      {bookSearchList.map((bookData) => {
        return (
          <>
            <BookDetails
              key={`book-search-list-${bookData.googleID}`}
              bookData={bookData}
              showSnippet={false}
            />
          </>
        );
      })}
    </>
  );
};

export default ExtendedBookSearch;
