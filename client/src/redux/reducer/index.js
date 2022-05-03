import {
  CREATE_USER,
  GET_TOKEN,
  GET_USER,
  GET_SONG_BY_NAME,
  GET_ALBUM_BY_NAME,
  GET_ARTIST_BY_NAME,
  CLEAR_DATA,
  USER_NEW_POST,
  SONGS_MORE_PLAYED,
  GET_ALL_POST,
} from "../actions";

// STATE CREATION
const initialState = {
  posts: [],
  msg: "",
  user: {},
  token: "",
  song: [],
  album: [],
  artist: [],
  songs: [],
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
    case GET_ALL_POST:
      return {
        ...state,
        posts: action.payload,
      };
    // case USER_NEW_POST:
    //   return {
    //     ...state,
    //     posts: state.posts.unshift(action.payload),
    //   };
    case SONGS_MORE_PLAYED:
      return {
        ...state,
        songs: action.payload,
      };
    default:
      return { ...state };
  }
}

export default rootReducer;
