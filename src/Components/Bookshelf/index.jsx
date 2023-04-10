import React from 'react'

import BookshelfItem from './BookshelfItem'

import { useUserDetails } from '../../hooks'

const Bookshelf = () => {
    const {userDetails} = useUserDetails()
    // console.log(userDetails)
  return (
    <div>Bookshelf</div>
  )
}

export default Bookshelf