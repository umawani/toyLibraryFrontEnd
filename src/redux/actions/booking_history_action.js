import { endpoints } from "../../constants/Api";
import { 
    GET_BOOKING_HISTORY,
    CLEAR_BOOKING_HISTORY,
 } from "../types";
import { callBackendAPI } from "./generic_action";

export const getBookingHistory = (productId) => (dispatch) => {
    dispatch(callBackendAPI(endpoints.getProductHistory + productId, "GET", {}, GET_BOOKING_HISTORY));
  };

export const clearBookingHistory = () => dispatch => {
    dispatch({type : CLEAR_BOOKING_HISTORY})
}