import React, { useEffect, useState } from "react";

import { Form, Dropdown } from "react-bootstrap";

import { useFindBook } from "../../hooks";

const BookSearch = () => {
  const [inDropdownFlag, setInDropdownFlag] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [openSearchFlag, setOpenSearchFlag] = useState(false);
  const { findBook } = useFindBook();

  const timeoutDelay = 1000;

  const handleChange = (e) => setSearchValue(e.target.value);

  const handleClick = () => setOpenSearchFlag(false);

  const handleBlur = () => {
    if (!inDropdownFlag) setOpenSearchFlag(false);
  };

  const toggleShow = () => {
    if (searchValue) setOpenSearchFlag((curr) => !curr);
  };

    const Book = ({ bookData }) => {
  //     const isUserFlag = friendData.userID === userDetails.userID ? true : false;

  //     const friendStatus = getFriendStatus(friendData.userID);
  //     if (friendStatus.friendStatus === "blocked") return;

      return ( null
  //       <Dropdown.Item
  //         onClick={() => handleClick()}
  //         style={{
  //           border: `${
  //             friendStatus.friendStatus === "pending"
  //               ? "1px solid green"
  //               : friendStatus.friendStatus === "friends"
  //               ? "1px solid blue"
  //               : ""
  //           }`,
  //           backgroundColor: `${isUserFlag ? "#F0F0F0" : ""}`,
  //         }}
  //       >
  //         <Stack direction="horizontal" gap={1}>
  //           <Image src="https://picsum.photos/100" height="50px" roundedCircle />
  //           <Stack className="ms-1">
  //             {friendData.handle}
  //             {isUserFlag && <div style={{ fontSize: "0.85rem" }}>You</div>}
  //             {friendStatus.friendStatus === "pending" && friendStatus.requestInboud && ( <div style={{ fontSize: "0.85rem" }}>Pending - Approve request?</div> )}
  //             {friendStatus.friendStatus === "pending" && !friendStatus.requestInboud && ( <div style={{ fontSize: "0.85rem" }}>Pending - Awaiting their reply.</div> )}
  //             {friendStatus.friendStatus === "friends" && ( <div style={{ fontSize: "0.85rem" }}>Friends</div> )}
  //           </Stack>

  //           <Stack direction="horizontal" gap={1} className="ms-1">
  //               {friendStatus.friendStatus === "pending" && !friendStatus.requestInboud && ( <RemoveFriendIcon userID={userDetails.userID} friendID={friendData.userID} token={authDetails.token} /> )}
  //               {friendStatus.friendStatus === "pending" && friendStatus.requestInboud && ( <AcceptFriendIcon userID={userDetails.userID} friendID={friendData.userID} token={authDetails.token} /> )}
  //               {!isUserFlag && !friendStatus.friendStatus && ( <AddFriendIcon userID={userDetails.userID} friendID={friendData.userID} token={authDetails.token} /> )}
  //               {!isUserFlag && ( <BlockUserIcon userID={userDetails.userID} friendID={friendData.userID} token={authDetails.token} /> )}
  //           </Stack>
  //         </Stack>
  //       </Dropdown.Item>
      );
    };

  useEffect(() => {
    if (!searchValue.length) {
      setSearchResults([]);
      return;
    }
    const timer = setTimeout(async () => {
      const books = await findBook(searchValue);
    //   setSearchResults(users);
    console.log("books = ", books)
    }, timeoutDelay);
    return () => clearTimeout(timer);
  }, [searchValue]);

  useEffect(() => {
    if (searchResults.length <= 0) setOpenSearchFlag(false);
    else setOpenSearchFlag(true);
  }, [searchResults]);

  return (
    <>
      <Dropdown
        show={openSearchFlag}
        onBlur={() => handleBlur()}
        onMouseEnter={() => setInDropdownFlag(true)}
        onMouseLeave={() => setInDropdownFlag(false)}
        className="d-none d-md-flex"
      >
        <Form>
          <Form.Control
            type="text"
            placeholder="Search for books"
            onChange={handleChange}
            value={searchValue}
            onClick={() => toggleShow()}
          />
        </Form>
        <Dropdown.Menu>
          {/* {searchResults.map((bookData, index) => (
            <Book key={`book-search-results-${index}`} bookData={bookData} />
          ))} */}
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
};

export default BookSearch;


/* 
https://github.com/JPEdgar/digital-bookshelf-client/tree/bcc9942e195ba456ed6facad1513a90e3bcfdcbd

const searchquery = `${API}/volumes?q=${query}`;

useEffect(() => {
  const delayDebounce = setTimeout(() => {
    handleSearch(searchQuery);
  }, 1000);
  return () => clearTimeout(delayDebounce);
}, [searchQuery]);

const handleSearch = async (query) => {
  if (!query) return;
  const searchquery = `${API}/volumes?q=${query}`;
  const searchResults = await searchForBooksOnline(searchquery);
  dispatch({
    type: BOOKSHELF_TYPES.SET_SEARCH_RESULTS,
    payload: searchResults,
  });
};




useEffect(() => {
  if (!openDropdown) return;

  const delayDebounce = setTimeout(() => {
    if (mouseEnter) return () => clearTimeout(delayDebounce);
    setOpenDropdown(false);
  }, 1000);

  return () => clearTimeout(delayDebounce);
}, [mouseEnter]);




const isbnSchema = new Schema ({ // []
  10: {type: Number}, // {type: "ISBN_10", identifier: ""}
  13: {type: Number}  // {type: "ISBN_13", identifier: ""}
})

const coversSchema = new Schema ({ // {}
  thumbnail: {type: String}, // .smallThumbnail
  small: {type: String}, // .thumbnail
})

const bookSchema = new Schema({
  googleID: {type: String, required: true}, // .id ""
  title: {type: String, required: true}, // .volumeInfo.title
  subtitle: {type: String}, // .volumeInfo.subtitle
  authors: [{type: String, required: true}], // .volumeInfo.authors [""]
  snippet: {type: String, default: ""}, // .volumeInfo.description ""
  isbn: isbnSchema, // .volumeInfo.industryIdentifiers... [{}]
  categories: [String], // .volumeInfo.categories [""]
  covers: coversSchema, // .volumeInfo.imageLinks... {}
  publishDate: String, // .volumeInfo.publishedDate
  pageCount: Number, // .volumeInfo.pageCount
  publisher: String, // .volumeInfo.publisher
});


https://developer.nytimes.com/docs/books-product/1/routes/lists.json/get
*/

//   console.log("using searchForBooksOnline utility");
  /* &maxResults= <int> 
     (40 max), how many results on the search query 
  */
  /* &startIndex= <int> 
     int > starts at 0, the page number of the search results 
  */
  /* q= <string>
     query > search string
     "query" > query in quotes = exact phrase
     -query > query w/ - in front means to exclude terms
     special keywords: 
      intitle: <string>
      inauthor: <string>
      inpublisher: <string>
      subject: <string>
      isbn: <string>
      lccn: <string>
      oclc: <string>
  */
  /* orderBy=
      relevant (default)
      newest
  */