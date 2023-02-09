import { useState } from "react";

import axios from "axios";

import { deleteAccount } from "../actions/auth";
import {deleteUserDetails} from "../actions/user"

import { useLogout } from "./";

const useDeleteUser = () => {
  const { logout } = useLogout();

  const deleteUser = async (state) => {
    const { data } = await deleteAccount(state.email, state.token);

    if (data.deleted.deletedCount) logout();
    else console.log("nothing deleted");

    const test = await deleteUserDetails(state.email, state.token)
  };

  return { deleteUser };
};

export default useDeleteUser;
