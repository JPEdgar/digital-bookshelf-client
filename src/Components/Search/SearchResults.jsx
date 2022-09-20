import React from "react";

import { Row, Col, Image, Card } from "react-bootstrap";

import { useBookshelfContext } from "../../Context/Bookshelf/BookshelfContext";

const SearchResults = () => {
  const { searchResults } = useBookshelfContext();

  console.log(searchResults);
  const { items } = searchResults;
  return (
    <>
      {items &&
        items.map((item, index) => (
          <SearchResult key={`searchResult-${index}`} item={item} />
        ))}
    </>
  );
};

const SearchResult = ({ item }) => {
  const { volumeInfo } = item;
  return (
    <Card>
      <Row>
        <Col xs={4}>
          <Image
            src={volumeInfo.imageLinks?.thumbnail}
            alt={`${volumeInfo.title} cover`}
          />
        </Col>
        <Col xs={8}>
          <div>{volumeInfo.title}</div>
          <Authors authors={volumeInfo.authors} />
          <Rating
            averageRating={volumeInfo.averageRating}
            ratingsCount={volumeInfo.ratingsCount}
          />
          <ReleaseDate publishedDate={volumeInfo.publishedDate} />
          <PageCount pageCount={volumeInfo.pageCount} />
          <div>
            {volumeInfo.industryIdentifiers.map((isbn, index) => {
              return <ISBN key={`isbn-${index}`} isbn={isbn} />;
            })}
          </div>
        </Col>
      </Row>
    </Card>
  );
};

const ISBN = ({ isbn }) => {
  return (
    <div>
      {isbn.type}: {isbn.identifier}
    </div>
  );
};

const Rating = ({ averageRating, ratingsCount }) => {
  return averageRating ? (
    <div>
      Rating: {averageRating}
      <span className="m-1">
        ({ratingsCount}
        {ratingsCount > 0 ? " reviews" : " reviewer"})
      </span>
    </div>
  ) : (
    <div>No reviews</div>
  );
};

const ReleaseDate = ({ publishedDate }) => {
  return <div>Released: {publishedDate}</div>;
};

const PageCount = ({ pageCount }) => {
  return (
    <>
      {/* {tempRes?.items.length > 0 &&
          tempRes.items.map((res, index) => (
            <SearchResult key={`res-${index}`} res={res} />
          ))} */}
    </>
  );
};

const Authors = ({ authors }) => {
  return (
    <div>
      by:
      <span className="m-1">
        {authors?.map((author, index) => (
          <Author
            key={`author-${index}`}
            author={author}
            index={index}
            length={authors.length}
          />
        ))}
      </span>
    </div>
  );
};

const Author = ({ author, index, length }) => {
  let returnValue = "";

  if (index === 0) returnValue = author;
  else if (index + 1 === length) returnValue = `, and ${author}`;
  else if (index > 0 && index + 1 !== length) returnValue = `, ${author}`;

  return <span>{returnValue}</span>;
};

export default SearchResults;
