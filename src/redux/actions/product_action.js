import { endpoints } from "../../constants/Api";
import { 
    GET_PRODUCT_LIST,
    ADD_PRODUCT,
    COMPLETE_PRODUCT_CREATE,
 } from "../types";
import { callBackendAPI, callMultiPartAPI } from "./generic_action";


export const getProductList = () => (dispatch) => {
    dispatch(callBackendAPI(endpoints.getProductList, "GET", {}, GET_PRODUCT_LIST));
  };

export const addProduct = (formdata) => dispatch => {
    dispatch(callMultiPartAPI(endpoints.addProduct, formdata, ADD_PRODUCT))
}

export const completeCreateProduct = () => dispatch => {
    dispatch({type: COMPLETE_PRODUCT_CREATE})
}



