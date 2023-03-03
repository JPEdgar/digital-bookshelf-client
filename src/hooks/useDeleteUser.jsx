import { deleteAccount } from "../actions/auth";

import { useLogout } from "./";

const useDeleteUser = () => {
  const { logout } = useLogout();

  const deleteUser = async (state) => {
    const { data } = await deleteAccount(state.email, state.token);

    if (data.deleted.deletedCount) logout();
    else console.log("nothing deleted");
  };

  return { deleteUser };
};

export default useDeleteUser;
