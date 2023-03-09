import AUTH_TYPES from "../constants/types/authTypes";

const authReducer = (state, action) => {
  // console.log("in authReducer - data = ", {state, action})
  switch (action.type) {
    case AUTH_TYPES.SIGNUP:
      return action.payload;
    case AUTH_TYPES.LOGIN:
      return action.payload;
    case AUTH_TYPES.LOGOUT:
      return { user: null };
    case AUTH_TYPES.UPDATE_EMAIL:
      
      return action.payload;
    default:
      console.log("dispatch - else");
      return state;
  }
};

export default authReducer;
