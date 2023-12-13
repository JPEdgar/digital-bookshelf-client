import React, { useState, useEffect } from "react";
import { Row } from "react-bootstrap";

import BookshelfItem from "./BookshelfItem";
import BookshelfMenu from "./BookshelfMenu";

import { useBookshelf } from "../../hooks";

const Bookshelf = () => {
  const { bookshelf } = useBookshelf();

  const [filteredShelf, setFilteredShelf] = useState(bookshelf.contents);
  const [filterBy, setFilterBy] = useState({
    favorites: true,
    wishlist: true,
    wantToRead: true,
    haveRead: true,
  });

  useEffect(() => {
    setFilteredShelf(
      bookshelf.contents?.filter((book) => {
        console.log(book.flagsList);
        // return book;
        if (filterBy.favorites && book.flagsList.isFavoriteFlag) return book;
        if (filterBy.wishlist && book.flagsList.inWishListFlag) return book;
        if (filterBy.wantToRead && book.flagsList.wantToReadFlag) return book;
        if (filterBy.haveRead && book.flagsList.haveReadFlag) return book;
      })
    );

    console.log(filteredShelf);
  }, [filterBy, bookshelf]);

  return (
    <>
      <Row>
        <BookshelfMenu filterBy={filterBy} setFilterBy={setFilterBy} />
      </Row>
      <Row>
        {filteredShelf?.map((item) => (
          <BookshelfItem key={`bookshelf-item-${item._id}`} content={item} />
        ))}
      </Row>
    </>
  );
};

export default Bookshelf;

// <button onClick={() => console.log(state)}>Log State</button>
// React.useEffect(() => console.log(bookshelf.contents), [bookshelf]);

// const [state, setState] = useState(null);

// const getBookDetails = async (API, isbn) => {
//   // console.log("api = ", API)
//   // console.log("isbn = ", isbn)
//   // console.log("using getBookDetails utility")
//   const abortController = new AbortController();

//   if (!API || !isbn) {
//     // window.alert("Error in getting book details.");
//     console.log("Error in getting book details.");
//     return;
//   }

//   let bookDetails;
//   try {
//     const bookDetailsData = await axios.get(`${API}/volumes?q=isbn:${isbn}`, {
//       signal: abortController.signal,
//     });
//     // console.log(bookDetailsData)
//     if (bookDetailsData) bookDetails = bookDetailsData.data.items[0];
//   } catch (error) {
//     console.log(error);
//   }

//   return bookDetails;
// };

// useEffect(() => {
//   //           https://www.googleapis.com/books/v1/volumes?q=bloodlines+of+atmos
//   const API = "https://www.googleapis.com/books/v1";
//   //                         /volumes?q=bloodlines+of+atmos
//   const query = '"Bloodlines of Atmos"';
//   const searchquery = `${API}/volumes?q=${query}`;
//   // console.log("searchquery = ", searchquery);
//   const test = async () => {
//     const ret = await axios.get(searchquery);
//     setState(ret.data);
//     return ret;
//   };

//   test()
// }, []);

// useEffect(() => {
//   console.log("state = ", state);
// }, [state]);

/////////////////////////////////////////
///////////// SEARCH PARAMS /////////////
/////////////////////////////////////////
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

/* 
/////////////////////////////////
//////////// SCHEMAS ////////////
/////////////////////////////////

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


///////////////////////////////////
//////////// MISC INFO ////////////
///////////////////////////////////

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

*/
