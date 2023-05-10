const { REACT_APP_API_BASE_URL } = process.env;

const baseUrl = REACT_APP_API_BASE_URL;

export const endpoints = {
  baseUrl: baseUrl,

  login: baseUrl + "user/login",
  register: baseUrl + "user/register",
  addToCart: baseUrl + "user/addToCart/",
  removeFromCart: baseUrl + "user/removeFromCart/",
  getProductList: baseUrl + "product/list",
  addProduct: baseUrl + "product/create",
  editProduct: baseUrl + "product/edit",
  getProductHistory: baseUrl + "BookingHistory/",
  userCheckout: baseUrl + "user/checkout",
};
