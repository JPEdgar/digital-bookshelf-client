import React, { useState } from "react";

import UserSearchForm from "./UserSearchForm";
import SearchResults from "./SearchResults";

const UserSearch = () => {
  const [searchResults, setSearchResults] = useState(null);
  
  // const [mouseEnter, setMouseEnter] = useState(false);
  // useEffect(() => {
  //   // if (!openDropdown) return;

  //   const delayDebounce = setTimeout(() => {
  //     //   if (mouseEnter) return () => clearTimeout(delayDebounce);
  //     //   setOpenDropdown(false);
  //   }, 1000);

  //   return () => clearTimeout(delayDebounce);
  // }, [mouseEnter]);

  return (
    <>
      <UserSearchForm setSearchResults={setSearchResults} />
      {searchResults && <SearchResults result={searchResults} />}
    </>
  );
};

export default UserSearch;
