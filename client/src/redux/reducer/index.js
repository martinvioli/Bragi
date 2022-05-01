import {
  CREATE_USER,
  GET_TOKEN,
  GET_USER,
  GET_SONG_BY_NAME,
  GET_ALBUM_BY_NAME,
  GET_ARTIST_BY_NAME,
  CLEAR_DATA,
} from "../actions";

// STATE CREATION
const initialState = {
  post: [],
  msg: "",
  user: {},
  token: "",
  song: [],
  album: [],
  artist: [],
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
    case GET_USER:
      return {
        ...state,
        user: action.payload,
      };
    case GET_TOKEN:
      return {
        ...state,
        token: action.payload,
      };
    case GET_SONG_BY_NAME:
      return {
        ...state,
        song: action.payload,
      };
    case GET_ALBUM_BY_NAME:
      return {
        ...state,
        album: action.payload,
      };
    case GET_ARTIST_BY_NAME:
      return {
        ...state,
        artist: [action.payload],
      };
    case CLEAR_DATA:
      return {
        ...state,
        song: [],
        artist: [],
        album: [],
      };
    default:
      return { ...state };
  }
}

export default rootReducer;
