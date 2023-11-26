import React from 'react'
import {Card} from "react-bootstrap"

const FriendsBook = ({book}) => {
    // console.log(book)
    const bookCover = book.coversList?.large ? book.coversList.large : book.coversList?.medium ? book.coversList.medium : book.coversList?.small

  return (
    <Card style={{ maxWidth: '10rem' }}>
    <Card.Img variant="top" src={bookCover} />
    <Card.Body>
      <Card.Title>{book.title}</Card.Title>
      {book.subtitle && <Card.Title>{book.subtitle}</Card.Title>}
      <Card.Text>
        {book.snippet}
      </Card.Text>
      
    </Card.Body>
  </Card>
  )
}

export default FriendsBook