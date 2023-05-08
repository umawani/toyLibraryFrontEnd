const { REACT_APP_API_BASE_URL } = process.env;

const baseUrl = REACT_APP_API_BASE_URL;

export const endpoints = {
  baseUrl: baseUrl,

  login: baseUrl + "/get",
};
