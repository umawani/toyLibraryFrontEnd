import { SYSTEM_ALERT } from "../types";

export const parseAPIReponse = (type, res, classIns) => (dispatch) => {
  console.log(res);
  if (res) {
    if (res.statusCode == 200) {
      dispatch({ type: type, payload: res, msg: res.message });
    } else if (res.statusCode === 400 && res.fieldErrors) {
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
    } else {
      alert(res.message);
    }
  }
};
