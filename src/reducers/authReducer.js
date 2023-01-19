import AUTH_TYPES from "../constants/authTypes";

const authReducer = (state, action) => {
  switch (action.type) {
    case AUTH_TYPES.SIGNUP:
      console.log("in authReducer - Sign up - payload = ", action.payload)
      return  action.payload ;
      case AUTH_TYPES.LOGIN:
      console.log("in authReducer - log in - payload = ", action.payload)
      return  action.payload ;
    case AUTH_TYPES.LOGOUT:
      return { user: null };
    default:
      console.log("dispatch - else")
      return state;
  }
};

export default authReducer;
