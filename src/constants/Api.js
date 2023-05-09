const { REACT_APP_API_BASE_URL } = process.env;

const baseUrl = REACT_APP_API_BASE_URL;

export const endpoints = {
  baseUrl: baseUrl,

  login: baseUrl + "user/login",
  addToCart: baseUrl + "user/addToCart/",
  removeFromCart: baseUrl + "user/removeFromCart/",
  getProductList: baseUrl + "product/list",
  addProduct: baseUrl + "product/create",
  getProductHistory: baseUrl + "BookingHistory/"
};
