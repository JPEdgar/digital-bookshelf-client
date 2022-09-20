import React from "react";

import axios from "axios";
import { Form, Button } from "react-bootstrap";

import { useBookshelfContext } from "../../../Context/Bookshelf/BookshelfContext";

const SearchBar = () => {
  const { searchData, setSearchData, setSearchResults, API } =
    useBookshelfContext();

  const handleSearch = async (query) => {
    // const api = "https://www.googleapis.com/books/v1/"
    // const api =
    // "https://www.googleapis.com/books/v1/volumes?q=harry+potter+inauthor:rowling";
    // `https://www.googleapis.com/books/v1/volumes?q=${query}`;
    // "https://www.googleapis.com/books/v1/volumes?q=harry+potter";

    // const api =
    //   "https://www.googleapis.com/books/v1/volumes?q=intitle:drizzt exile+inauthor:Salvatore";

    const search = `${API}/volumes?q=${query}`
    console.log(search)
    axios
      .get(search)
      .then((res) => setSearchResults(res.data));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch(searchData.searchQuery);
  };

  const handleChange = (e) => {
    setSearchData((curr) => ({ ...curr, [e.target.name]: e.target.value }));
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Search:</Form.Label>
          <Form.Control
            type="text"
            name="searchQuery"
            placeholder="Enter book title"
            onChange={handleChange}
            value={searchData.searchQuery}
          />
        </Form.Group>

        <Button type="submit" className="mt-1">
          Search
        </Button>
      </Form>
    </>
  );
};

export default SearchBar;
