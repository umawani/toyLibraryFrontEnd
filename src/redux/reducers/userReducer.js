import { 
  LOGIN,
  REMOVE_FROM_CART,
  ADD_TO_CART,
  REGISTER,
  COMPLETE_REGISTRATION,
 } from "../types";

const initialState = {
  userData: "",
  loggedIn: false,
  registered: false,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        userData: action.payload.body.userDetails,
        loggedIn: true,
      };
    case ADD_TO_CART:
      return{
        ...state,
        userData: action.payload.body,
      }
    case REMOVE_FROM_CART:
      return{
        ...state,
        userData: action.payload.body,
      }
    case REGISTER:
      return{
        ...state,
        registered: true,
      }
    case COMPLETE_REGISTRATION:
      return{
        ...state,
        registered : false,
      }
    default:
      return state;
  }
};

export default userReducer;
