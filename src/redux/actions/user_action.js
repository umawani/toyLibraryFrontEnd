import { endpoints } from "../../constants/Api";
import { LOGIN } from "../types";
import { callBackendAPI } from "./generic_action";

export const login = () => (dispatch) => {
  dispatch(callBackendAPI(endpoints.login, "GET", {}, LOGIN));
};
