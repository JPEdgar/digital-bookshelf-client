import AUTH_TYPES from "../constants/authTypes";

const authReducer = (state, action) => {
  switch (action.type) {
    case AUTH_TYPES.SIGNUP:
      return { user: action.payload };
    case AUTH_TYPES.LOGIN:
      return { user: action.payload };
    case AUTH_TYPES.LOGOUT:
      return { user: null };
    default:
      console.log("dispatch - else")
      return state;
  }
};

export default authReducer;
