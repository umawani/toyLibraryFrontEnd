import { 
    GET_PRODUCT_LIST
   } from "../types";
  
  const initialState = {
    productList: []
  };

  const productReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_PRODUCT_LIST:
        return{
            productList: action.payload.body.products,
        }
      default:
        return state;
    }
  };
  
  export default productReducer;
  