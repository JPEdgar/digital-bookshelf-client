import React from 'react'

import { useUserContext } from "../../hooks";

const ProfileSettings = () => {
    const { userDetails } = useUserContext();
    React.useEffect(() => console.log(userDetails), [userDetails]);
  return (
    <div>ProfileSettings</div>
  )
}

export default ProfileSettings