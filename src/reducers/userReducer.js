import USER_TYPES from "../constants/userTypes";

const userReducer = (state, action) => {
  switch (action.type) {
    case USER_TYPES.SET_USER_DETAILS:
      return action.payload;
    default:
      return state;
  }
};

export default userReducer;
