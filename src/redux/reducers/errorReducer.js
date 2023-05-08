import { SHOW_ERRORS_ONLY, SYSTEM_ALERT } from "../actions/types";

const initialState = {
  msg: {},
  status: null,
};

const errorReducer = (state = initialState, action) => {
  switch (action.type) {
    case SYSTEM_ALERT:
      return {
        notification: action.payload,
      };
    case SHOW_ERRORS_ONLY:
      return {
        notification: action.payload,
      };
    default:
      return state;
  }
};

export default errorReducer;
