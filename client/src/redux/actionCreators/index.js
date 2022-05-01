import { CREATE_USER, LOG_IN } from "../actions";
import axios from "axios";

export const createUser = function (input) {
  return async (dispatch) => {
    const response = await axios.post("http://localhost:3001/register", input);
    return dispatch({
      type: CREATE_USER,
      payload: response.data,
    });
  };
};

export const userLogin = function (user) {
  return {
    type: LOG_IN,
    payload: user,
  };
};

//export const userLogged = function () {};
