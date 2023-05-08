import { 
  LOGIN,
  REMOVE_FROM_CART,
 } from "../types";

const initialState = {
  userData: "",
  loggedIn: false,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        userData: action.payload.body.userDetails,
        loggedIn: true,
      };
    case REMOVE_FROM_CART:
      return{
        ...state,
        userData: action.payload.body,
      }
    default:
      return state;
  }
};

export default userReducer;
