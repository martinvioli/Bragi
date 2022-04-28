import { CREATE_USER, LOG_IN } from "../actions";

// STATE CREATION
const initialState = {
  post: [],
  msg: "",
  user: {},
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_USER:
      if (action.payload.msgE) {
        return {
          ...state,
          msg: action.payload.msgE,
        };
      } else {
        return {
          ...state,
          msg: "Formulario creado con exito.",
        };
      }
    case LOG_IN:
      return {
        ...state,
        user: action.payload,
      };
    default:
      return { ...state };
  }
}

export default rootReducer;
