import React from 'react'

import { useUserContext } from '../../hooks'

const UserSettings = () => {
  const {userState} = useUserContext()

  React.useEffect(() => console.log(userState), [userState])
  return (
    <div>UserSettings</div>
  )
}

export default UserSettings