import { SYSTEM_ALERT } from "../types";

export const parseAPIReponse = (type, res, classIns) => (dispatch) => {
  if (res) {
    if (res.status == 200) {
      dispatch({
        type: SYSTEM_ALERT,
        payload: {
          alertType: "success",
          msg: res.message,
          flag: true,
          isLoading: false,
          classIns,
        },
      });
      dispatch({ type: type, payload: res, msg: res.message });
    } else if (res.status === 400 && res.fieldErrors) {
      dispatch({
        type: SYSTEM_ALERT,
        payload: {
          alertType: "error",
          msg: res.fieldErrors[0].defaultMessage,
          flag: true,
          isLoading: false,
          classIns,
        },
      });
    } else if (
      res.status === 400 ||
      res.status === 404 ||
      res.status === 409 ||
      res.status === 417
    ) {
      dispatch({
        type: SYSTEM_ALERT,
        payload: {
          alertType: "error",
          msg: res.message,
          flag: true,
          isLoading: false,
          classIns,
        },
      });
    } else if (
      res.status === 400 ||
      res.status === 404 ||
      res.status === 409 ||
      res.status === 417
    ) {
      dispatch({
        type: SYSTEM_ALERT,
        payload: {
          alertType: "error",
          msg: res.message,
          flag: true,
          isLoading: false,
          classIns,
        },
      });
    } else if (res.status === 500) {
      dispatch({
        type: SYSTEM_ALERT,
        payload: {
          alertType: "error",
          msg: res.message,
          flag: true,
          isLoading: false,
          classIns,
        },
      });
    } else if (res.status === 417) {
      dispatch({
        type: SYSTEM_ALERT,
        payload: {
          alertType: "error",
          msg: res.message,
          flag: true,
          isLoading: false,
          classIns,
        },
      });
    } else if (
      res.statusCode === 401 ||
      res.status === 403 ||
      res.status === 406
    ) {
      window.location.href = "/";
    }
  }
};
