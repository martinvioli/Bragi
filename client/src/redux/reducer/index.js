import { CREATE_USER } from "../actions";

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
    default:
      return { ...state };
  }
}

export default rootReducer;
