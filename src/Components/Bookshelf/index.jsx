import React, { useEffect, useState } from "react";

import { Row, Col, Image } from "react-bootstrap";
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
        {bookshelfList &&
          bookshelfList.map((book, index) => (
            
              <Col key={`bookshelfListItem-${index}`} className="justify-content-center">
                <Image src={book.volumeInfo.imageLinks?.thumbnail} alt="book cover" height="250px" thumbnail/>
                <div style={{ overflow: "hidden" }}>{book.volumeInfo.title}</div>
                {book.volumeInfo.subtitle && <div style={{ overflow: "hidden" }}>{book.volumeInfo.subtitle}</div>}

              </Col>
            
          ))}
      </Row>
    </>
  );
};

export default Bookshelf;
