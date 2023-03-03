import USER_TYPES from "../constants/types/userTypes";

const userReducer = (state, action) => {
  switch (action.type) {
    case USER_TYPES.SET_USER:
      return action.payload;
    default:
      console.log("dispatch - else");
      return state;
  }
};

export default userReducer;
