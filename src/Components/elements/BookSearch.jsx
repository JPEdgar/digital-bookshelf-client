import React, { useEffect, useState } from "react";

import { Form, Dropdown, Stack, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import { useFindBook, useBookshelf, useSearchDetails } from "../../hooks";
import ShowMoreIcon from "./ShowMoreIcon";
import { cropString } from "../../utilities";

const BookSearch = () => {
  const [inDropdownFlag, setInDropdownFlag] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [openSearchFlag, setOpenSearchFlag] = useState(false);
  const { findBook } = useFindBook();
  const { setBookFocus } = useBookshelf();
  const navigate = useNavigate();
  const { bookSearchList, updateBookSearch, clearBookSearch } =
    useSearchDetails();

  const timeoutDelay = 1000;

  const handleChange = (e) => setSearchValue(e.target.value);

  const handleClick = (bookData) => {
    setBookFocus(bookData);
    setOpenSearchFlag(false);
    navigate("/book-details");
  };

  const handleBlur = () => {
    if (!inDropdownFlag) setOpenSearchFlag(false);
  };

  const toggleShow = () => {
    if (searchValue) setOpenSearchFlag((curr) => !curr);
  };

  const Book = ({ bookData }) => {
    return (
      <Dropdown.Item onClick={() => handleClick(bookData)}>
        <Stack direction="horizontal" gap={1} className="w-100">
          <Image src={bookData.coversList.small} height="100px" />
          <Stack className="ms-1" style={{ width: "15em" }}>
            <div>{cropString(bookData.title, 25)}</div>
            <div>{cropString(bookData.subtitle, 25)}</div>
            <div>By: {cropString(bookData.authorString, 25)}</div>
          </Stack>

          <Stack gap={1} className="ms-1" style={{ fontSize: "0.75rem" }}>
            <div>Flags</div>
            <div>In Shelf</div>
            <div>Wish List</div>
            <div>Read</div>
            <div>etc...</div>
          </Stack>
        </Stack>
      </Dropdown.Item>
    );
  };

  useEffect(() => {
    if (!searchValue.length) {
      clearBookSearch();
      return;
    }
    const timer = setTimeout(async () => {
      const books = await findBook(searchValue);
      updateBookSearch(books);
      console.log("books = ", books);
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
        <Form onSubmit={(e) => e.preventDefault()}>
          <Form.Control
            type="text"
            placeholder="Search for books"
            onChange={handleChange}
            value={searchValue}
            onClick={() => toggleShow()}
          />
        </Form>
        <Dropdown.Menu>
          {bookSearchList.map((bookData) => (
            <Book
              key={`book-search-results-${bookData.googleID}`}
              bookData={bookData}
            />
          ))}
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
