import { endpoints } from "../../constants/Api";
import { 
  LOGIN,
  REMOVE_FROM_CART,
  ADD_TO_CART,
 } from "../types";
import { callBackendAPI } from "./generic_action";

export const login = (formdata) => (dispatch) => {
  dispatch(callBackendAPI(endpoints.login, "POST", formdata, LOGIN));
};

export const addToCart = (userId, productId) => dispatch => {
  dispatch(callBackendAPI(endpoints.addToCart + userId + "/" + productId, "GET", {}, ADD_TO_CART));
}

export const removeFromCart = (productId, userId) => (dispatch) =>  {
  dispatch(callBackendAPI(endpoints.removeFromCart + userId + "/" + productId, "DELETE", {}, REMOVE_FROM_CART))
}
