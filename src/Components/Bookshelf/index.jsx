import React, { useEffect, useState } from "react";

import axios from "axios";

import BookshelfItem from "./BookshelfItem";

// import { useBookshelf } from "../../hooks";

const Bookshelf = () => {
  // const { bookshelf } = useBookshelf();
  // React.useEffect(() => console.log(bookshelf.contents), [bookshelf]);

  const [state, setState] = useState(null);

  const getBookDetails = async (API, isbn) => {
    // console.log("api = ", API)
    // console.log("isbn = ", isbn)
    // console.log("using getBookDetails utility")
    const abortController = new AbortController();

    if (!API || !isbn) {
      // window.alert("Error in getting book details.");
      console.log("Error in getting book details.");
      return;
    }

    let bookDetails;
    try {
      const bookDetailsData = await axios.get(`${API}/volumes?q=isbn:${isbn}`, {
        signal: abortController.signal,
      });
      // console.log(bookDetailsData)
      if (bookDetailsData) bookDetails = bookDetailsData.data.items[0];
    } catch (error) {
      console.log(error);
    }

    return bookDetails;
  };

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

  return (
    <>
      {/* <button onClick={() => console.log(state)}>Log State</button> */}
      {/* {bookshelf?.contents?.map((item) => ( <BookshelfItem key={`bookshelf-item-${item._id}`} content={item} /> ))} */}
    </>
  );
};

export default Bookshelf;
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


