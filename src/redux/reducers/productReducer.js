import { 
    GET_PRODUCT_LIST,
    ADD_PRODUCT,
    COMPLETE_PRODUCT_CREATE,
    EDIT_PRODUCT
   } from "../types";
  
  const initialState = {
    productList: [],
    created: false,
  };

  const productReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_PRODUCT_LIST:
            return{
                ...state,
                productList: action.payload.body.products,
            }
        case ADD_PRODUCT:
            return{
                ...state,
                created : true
            }
        case EDIT_PRODUCT:
            return{
                ...state,
                created: true,
            }
        case COMPLETE_PRODUCT_CREATE:
            return{
                ...state,
                created : false,
            }
        default:
            return state;
    }
  };
  
  export default productReducer;
  