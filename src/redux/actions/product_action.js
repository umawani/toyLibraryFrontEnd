import { endpoints } from "../../constants/Api";
import { 
    GET_PRODUCT_LIST
 } from "../types";
import { callBackendAPI } from "./generic_action";


export const getProductList = () => (dispatch) => {
    dispatch(callBackendAPI(endpoints.getProductList, "GET", {}, GET_PRODUCT_LIST));
  };



