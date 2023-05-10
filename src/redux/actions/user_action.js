import { endpoints } from "../../constants/Api";
import { 
  LOGIN,
  LOGOUT,
  REMOVE_FROM_CART,
  ADD_TO_CART,
  REGISTER,
  COMPLETE_REGISTRATION,
  USER_CHECKOUT,
  COMPLETE_CHECKOUT,
 } from "../types";
import { callBackendAPI } from "./generic_action";

export const login = (formdata) => (dispatch) => {
  dispatch(callBackendAPI(endpoints.login, "POST", formdata, LOGIN));
};

export const logout = () => dispatch => {
  dispatch({type: LOGOUT})
}

export const addToCart = (userId, productId) => dispatch => {
  dispatch(callBackendAPI(endpoints.addToCart + userId + "/" + productId, "GET", {}, ADD_TO_CART));
}

export const removeFromCart = (productId, userId) => (dispatch) =>  {
  dispatch(callBackendAPI(endpoints.removeFromCart + userId + "/" + productId, "DELETE", {}, REMOVE_FROM_CART))
}

export const register = (formdata) => dispatch => {
  dispatch(callBackendAPI(endpoints.register, "POST", formdata, REGISTER));
}

export const completeRegistration = () => dispatch => {
  dispatch({type : COMPLETE_REGISTRATION})
}

export const userCheckout = (userId) => dispatch => {
  dispatch(callBackendAPI(endpoints.userCheckout + "/" + userId, "GET", {}, USER_CHECKOUT))
}

export const completeCheckout = () => dispatch => {
  dispatch({type: COMPLETE_CHECKOUT});
}