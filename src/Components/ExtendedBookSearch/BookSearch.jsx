import React, { useEffect, useState } from "react";

import {
  Form,
  Dropdown,
  Stack,
  Image,
  InputGroup,
  ButtonGroup,
  Button,
  Row,
} from "react-bootstrap";
// import { useNavigate } from "react-router-dom";

// import BookSearchItem from "./BookSearchItem";
import {
  useFindBook,
  useBookshelf,
  useSearchDetails,
  useAuthDetails,
} from "../../hooks";
// import { cropString } from "../../utilities";
// import ShowMoreIcon from "./ShowMoreIcon";
// import FavoritesIcon from "./FavoritesIcon";
// import WishListIcon from "./WishListIcon";
// import WantToReadIcon from "./WantToReadIcon";
// import HaveReadIcon from "./HaveReadIcon";
// import TrashIcon from "./TrashIcon";
// import FilterIcon from "./FilterIcon";

import BookCard from "./BookCard";

const BookSearch = () => {
  const { authDetails } = useAuthDetails();
  const [inDropdownFlag, setInDropdownFlag] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  // const [searchValue, setSearchValue] = useState("Bloodlines of Atmos");
  const [openSearchFlag, setOpenSearchFlag] = useState(false);
  const [searchMax, setSearchMax] = useState(5);
  const { findBook } = useFindBook();
  const { setBookFocus, isOnBookshelf, isLoadingFlag } = useBookshelf();
  const { bookSearchList, updateBookSearch, clearBookSearch } =
    useSearchDetails();

  const timeoutDelay = 1000;

  //   const handleChange = (e) => setSearchValue(e.target.value);

  const [query, setQuery] = useState({
    byAuthor: "",
    byTitle: "",
    byISBN: "",
    byPublisher: "",
  });

  const [res, setRes] = useState([]);

  const handleChange = (e) => {
    setQuery((curr) => ({ ...curr, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const searchQuery = {};
    let searchFlag = false;
    if (query.byTitle.length > 3) {
      searchQuery.byTitle = query.byTitle;
      searchFlag = true;
    }
    if (query.byAuthor.length > 3) {
      searchQuery.byAuthor = query.byAuthor;
      searchFlag = true;
    }
    if (query.byPublisher.length > 3) {
      searchQuery.byPublisher = query.byPublisher;
      searchFlag = true;
    }
    if (query.byISBN.length > 3) {
      searchQuery.byISBN = query.byISBN;
      searchFlag = true;
    }

    if (searchFlag) {
      const books = await findBook(searchQuery);
      console.log(books);
      if (books.length > 0) setRes(books);
    }
  };

  const clearForm = () => {
    setQuery({
      byAuthor: "",
      byTitle: "",
      byISBN: "",
      byPublisher: "",
    });
  };

  const clearResults = () => {
    setRes([]);
  };

  // useEffect(() => {
  //   console.log(query);
  // }, [query]);

  //   const handleBlur = () => {
  //     if (!inDropdownFlag) setOpenSearchFlag(false);
  //   };

  //   const toggleShow = () => {
  //     if (searchValue) setOpenSearchFlag((curr) => !curr);
  //   };

  //   useEffect(() => {
  //     if (!searchValue.length) {
  //       clearBookSearch();
  //       return;
  //     }
  //     const timer = setTimeout(async () => {
  //       const books = await findBook(searchValue);
  //       updateBookSearch(books);
  //       // console.log("bookSearch = ", books);
  //       setSearchMax(5)
  //     }, timeoutDelay);
  //     return () => clearTimeout(timer);

  //   }, [searchValue]);

  //   useEffect(() => {
  //     if (bookSearchList.length <= 0) setOpenSearchFlag(false);
  //     else setOpenSearchFlag(true);
  //   }, [bookSearchList]);

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <InputGroup className="mt-3">
          <InputGroup.Text style={{ width: "7.5rem" }}>
            Book Title:
          </InputGroup.Text>
          <Form.Control
            placeholder="Search by book title"
            name="byTitle"
            onChange={handleChange}
            value={query.byTitle}
          />
        </InputGroup>

        <InputGroup>
          <InputGroup.Text style={{ width: "7.5rem" }}>
            Author Name:
          </InputGroup.Text>
          <Form.Control
            placeholder="Search by author"
            name="byAuthor"
            onChange={handleChange}
            value={query.byAuthor}
          />
        </InputGroup>

        <InputGroup>
          <InputGroup.Text style={{ width: "7.5rem" }}>
            By Publisher:
          </InputGroup.Text>
          <Form.Control
            placeholder="Search by publisher"
            name="byPublisher"
            onChange={handleChange}
            value={query.byPublisher}
          />
        </InputGroup>

        <InputGroup className="mb-3">
          <InputGroup.Text style={{ width: "7.5rem" }}>ISBN:</InputGroup.Text>
          <Form.Control
            placeholder="Search by ISBN"
            name="byISBN"
            onChange={handleChange}
            value={query.byISBN}
          />
        </InputGroup>

        <div className="d-flex justify-content-between w-100">
          <Button onClick={() => clearResults()} variant="danger">
            Clear Results
          </Button>
          <ButtonGroup>
            <Button onClick={() => clearForm()} variant="warning">
              Clear
            </Button>
            <Button type="submit" variant="success" className="px-4">
              Search
            </Button>
          </ButtonGroup>
        </div>
      </Form>
      <hr />
      <Row>
        {res.map(
          (bookData) =>
            bookData.title &&
            bookData.authorString &&
            (bookData.coversList.large ||
              bookData.coversList.medium ||
              bookData.coversList.small) && (
              <BookCard
                key={`book-search-${bookData.googleID}`}
                bookData={bookData}
              />
            )
        )}
      </Row>
      {/* <Dropdown
        show={openSearchFlag}
        onBlur={() => handleBlur()}
        onMouseEnter={() => setInDropdownFlag(true)}
        onMouseLeave={() => setInDropdownFlag(false)}
        className="d-none d-md-flex"
    > */}
      {/* <Form onSubmit={(e) => e.preventDefault()} className="d-flex align-items-center me-2 bg-success">
          <Form.Control
            type="text"
            placeholder="Search for books"
            onChange={handleChange}
            value={searchValue}
            // onClick={() => toggleShow()}
          />
     
        </Form> */}
      {/* <Dropdown.Menu>
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
      </Dropdown> */}
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
