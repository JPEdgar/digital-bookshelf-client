import USER_TYPES from "../constants/userTypes";

const userReducer = (state, action) => {
  switch (action.type) {
    case USER_TYPES.SET_USER_DETAILS:
      console.log("in userReducer - set user details - payload = ", action.payload)
      return action.payload;
    default:
      return state;
  }
};

export default userReducer;
