import { 
    GET_BOOKING_HISTORY,
    CLEAR_BOOKING_HISTORY
   } from "../types";
  
  const initialState = {
    list: [],
  };

  const bookingHistoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_BOOKING_HISTORY:
            return{
                ...state,
                list: action.payload.body,
            }
        case CLEAR_BOOKING_HISTORY:
            return{
                ...state,
                list: [],
            }
        default:
            return state;
    }
}

export default bookingHistoryReducer;