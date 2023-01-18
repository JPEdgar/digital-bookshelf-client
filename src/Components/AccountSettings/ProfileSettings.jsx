import React from "react";

import ProfileForm from "./ProfileForm";
import { useUserContext } from "../../hooks";
const ProfileSettings = () => {
  // const { userDetails } = useUserContext();
  // React.useEffect(() => console.log(userDetails), [userDetails]);
  return (
    <>
      <ProfileForm />
    </>
  );
};

export default ProfileSettings;
