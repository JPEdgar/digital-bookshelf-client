import React, { useEffect, useState } from "react";

import { Form, Dropdown, Stack, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import BookSearchItem from "./BookSearchItem";
import {
  useFindBook,
  useBookshelf,
  useSearchDetails,
  useAuthDetails,
} from "../../hooks";
import { cropString } from "../../utilities";
import ShowMoreIcon from "./ShowMoreIcon";
import FavoritesIcon from "./FavoritesIcon";
import WishListIcon from "./WishListIcon";
// import WantToReadIcon from "./WantToReadIcon";
import HaveReadIcon from "./HaveReadIcon";
import TrashIcon from "./TrashIcon";
import FilterIcon from "./FilterIcon";

const BookSearch = () => {
  const { authDetails } = useAuthDetails();
  const [inDropdownFlag, setInDropdownFlag] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  // const [searchValue, setSearchValue] = useState("Bloodlines of Atmos");
  const [openSearchFlag, setOpenSearchFlag] = useState(false);
  const [searchMax, setSearchMax] = useState(5)
  const { findBook } = useFindBook();
  const { setBookFocus, isOnBookshelf, isLoadingFlag } = useBookshelf();
  const { bookSearchList, updateBookSearch, clearBookSearch } =
    useSearchDetails();


  const timeoutDelay = 1000;

  const handleChange = (e) => setSearchValue(e.target.value);

  const handleBlur = () => {
    if (!inDropdownFlag) setOpenSearchFlag(false);
  };

  const toggleShow = () => {
    if (searchValue) setOpenSearchFlag((curr) => !curr);
  };

  useEffect(() => {
    if (!searchValue.length) {
      clearBookSearch();
      return;
    }
    const timer = setTimeout(async () => {
      const books = await findBook({general: searchValue});
      updateBookSearch(books);
      // console.log("bookSearch = ", books);
      setSearchMax(5)
    }, timeoutDelay);
    return () => clearTimeout(timer);
  
  }, [searchValue]);

  useEffect(() => {
    if (bookSearchList.length <= 0) setOpenSearchFlag(false);
    else setOpenSearchFlag(true);
  }, [bookSearchList]);

  return (
    <>
      <Dropdown
        show={openSearchFlag}
        onBlur={() => handleBlur()}
        onMouseEnter={() => setInDropdownFlag(true)}
        onMouseLeave={() => setInDropdownFlag(false)}
        className="d-none d-md-flex"
      >
        <Form onSubmit={(e) => e.preventDefault()} className="d-flex align-items-center me-2">
          <Form.Control
            type="text"
            placeholder="Search for books"
            onChange={handleChange}
            value={searchValue}
            onClick={() => toggleShow()}
          />
          <FilterIcon filterOption="book-search"/>
        </Form>
        <Dropdown.Menu>
          {bookSearchList.map(
            (bookData, index) =>
              index < searchMax && (
                <BookSearchItem
                  key={`book-search-results-${bookData.googleID}`}
                  bookData={bookData}
                  setOpenSearchFlag={setOpenSearchFlag} setSearchMax={setSearchMax}
                />
              )
          )}
          <ShowMoreIcon
            loc="/book-search"
            setToggleDropdownFlag={() => setOpenSearchFlag()}
          />
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
