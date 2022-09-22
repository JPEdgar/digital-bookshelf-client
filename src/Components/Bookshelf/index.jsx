import React, { useEffect, useState } from "react";

import { Row, Col } from "react-bootstrap";

import BookCard from "./BookCard";
import { getBookDetails } from "../../utilities";
import { useBookshelfContext } from "../../Context/Bookshelf/BookshelfContext";

const Bookshelf = () => {
  const [bookshelfList, setBookshelfList] = useState([]);
  const { bookshelf, API } = useBookshelfContext();

  useEffect(() => {
    const tempBookshelf = [];
    const getBookshelfDetails = async () => {
      for (let i = 0; i < bookshelf.length; i++) {
        if (bookshelf[i].inBookshelfFlag) {
          let tempBookshelfItem;
          if (bookshelf[i].id)
            tempBookshelfItem = await getBookDetails(API, bookshelf[i].id);
          else if (bookshelf[i].isbn13)
            tempBookshelfItem = await getBookDetails(API, bookshelf[i].isbn13);
          else if (bookshelf[i].isbn10)
            tempBookshelfItem = await getBookDetails(API, bookshelf[i].isbn10);
          tempBookshelf.push(tempBookshelfItem);
        }
      }
    };
    getBookshelfDetails();
    setBookshelfList(tempBookshelf);
  }, [bookshelf]);

  useEffect(() => console.log(bookshelfList), [bookshelfList]);

  return (
    <>
      <button onClick={() => console.log(bookshelfList)}>
        Log Bookshelf List
      </button>
      <Row>
        <BookList bookshelfList={bookshelfList} />
      </Row>
    </>
  );
};

const BookList = ({ bookshelfList = [] }) => {
  return (
    <>
      {bookshelfList.map((book, index) => {
        const image = book.volumeInfo.imageLinks?.thumbnail;
        const title = book.volumeInfo.title;
        const subtitle = book.volumeInfo?.subtitle;
        const authors = book.volumeInfo.authors;

        return (
       <>
            <BookCard  key={`bookshelfListItem-${index}`} image={image} title={title} subtitle={subtitle} authors={authors} />
            <BookCard  key={`bookshelfListItem-${index}`} image={image} title={title} subtitle={subtitle} authors={authors} />
            <BookCard  key={`bookshelfListItem-${index}`} image={image} title={title} subtitle={subtitle} authors={authors} />
            <BookCard  key={`bookshelfListItem-${index}`} image={image} title={title} subtitle={subtitle} authors={authors} />
            <BookCard  key={`bookshelfListItem-${index}`} image={image} title={title} subtitle={subtitle} authors={authors} />
            <BookCard  key={`bookshelfListItem-${index}`} image={image} title={title} subtitle={subtitle} authors={authors} />
            <BookCard  key={`bookshelfListItem-${index}`} image={image} title={title} subtitle={subtitle} authors={authors} />
            <BookCard  key={`bookshelfListItem-${index}`} image={image} title={title} subtitle={subtitle} authors={authors} />
            <BookCard  key={`bookshelfListItem-${index}`} image={image} title={title} subtitle={subtitle} authors={authors} />
            <BookCard  key={`bookshelfListItem-${index}`} image={image} title={title} subtitle={subtitle} authors={authors} />
            <BookCard  key={`bookshelfListItem-${index}`} image={image} title={title} subtitle={subtitle} authors={authors} />
            <BookCard  key={`bookshelfListItem-${index}`} image={image} title={title} subtitle={subtitle} authors={authors} />
            <BookCard  key={`bookshelfListItem-${index}`} image={image} title={title} subtitle={subtitle} authors={authors} />
            <BookCard  key={`bookshelfListItem-${index}`} image={image} title={title} subtitle={subtitle} authors={authors} />
            <BookCard  key={`bookshelfListItem-${index}`} image={image} title={title} subtitle={subtitle} authors={authors} />
            <BookCard  key={`bookshelfListItem-${index}`} image={image} title={title} subtitle={subtitle} authors={authors} />
            <BookCard  key={`bookshelfListItem-${index}`} image={image} title={title} subtitle={subtitle} authors={authors} />
            <BookCard  key={`bookshelfListItem-${index}`} image={image} title={title} subtitle={subtitle} authors={authors} />
            <BookCard  key={`bookshelfListItem-${index}`} image={image} title={title} subtitle={subtitle} authors={authors} />
            <BookCard  key={`bookshelfListItem-${index}`} image={image} title={title} subtitle={subtitle} authors={authors} />
            <BookCard  key={`bookshelfListItem-${index}`} image={image} title={title} subtitle={subtitle} authors={authors} />
            <BookCard  key={`bookshelfListItem-${index}`} image={image} title={title} subtitle={subtitle} authors={authors} />
     </>
        );
      })}
    </>
  );
};

export default Bookshelf;
