import api from "../../Utils";
import {
  CREATE_USER,
  GET_TOKEN,
  GET_USER,
  GET_SONG_BY_NAME,
  GET_ALBUM_BY_NAME,
  GET_ARTIST_BY_NAME,
  CLEAR_DATA,
  GET_TOP_10_ALBUMS,
  GET_TOP_10_SONGS,
  GET_TOP_10_ARTISTS,
  GET_ALL_POST,
  USER_NEW_POST,
  USER_UPDATE_POST,
  DELETE_POST,
  GET_SONG_BY_ID,
  GET_ALBUM_BY_ID,
  GET_ARTIST_BY_ID,
  CLEAR_DETAILS,
  GET_PHOTO_USER,
  GET_ALL_COMMENT,
  USER_NEW_COMMENT,
  USER_UPDATE_COMMENT,
  DELETE_COMMENT
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
  topSongs: [],
  topArtists: [],
  topAlbums: [],
  songById: {},
  albumById: {},
  artistById: {},
  profileImage: "",
  comments:[],
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

    // case USER_NEW_POST:
    //   return {
    //     ...state,
    //     posts: state.posts.unshift(action.payload),
    //   };
    case GET_TOP_10_ALBUMS:
      return {
        ...state,
        topAlbums: action.payload,
      };
    case GET_TOP_10_ARTISTS:
      return {
        ...state,
        topArtists: action.payload,
      };
    case GET_TOP_10_SONGS:
      return {
        ...state,
        topSongs: action.payload,
      };
    case GET_ALL_POST:
      return {
        ...state,
        posts: action.payload,
      };
    case USER_NEW_POST:
      return {
        ...state,
        posts: action.payload,
      };
    case USER_UPDATE_POST:
      return {
        ...state,
        posts: action.payload,
      };
    case DELETE_POST:
      return {
        ...state,
        posts: action.payload,
      };
    case GET_SONG_BY_ID:
      return {
        ...state,
        songById: action.payload,
      };
    case GET_ALBUM_BY_ID:
      return {
        ...state,
        albumById: action.payload,
      };
    case GET_ARTIST_BY_ID:
      return {
        ...state,
        artistById: action.payload,
      };
    case CLEAR_DETAILS:
      return {
        ...state,
        songById: {},
        artistById: {},
        albumById: {},
      };
    case GET_PHOTO_USER:
      return {
        ...state,
        profileImage: `${api.getPhotoUser}${action.payload}`,
      };
      case GET_ALL_COMMENT:
        return{
        ...state,
        comments: action.payload,
      };
      case USER_NEW_COMMENT:
      return {
        ...state,
        comments: action.payload,
      };
    case USER_UPDATE_COMMENT:
      return {
        ...state,
        comments: action.payload,
      };
    case DELETE_COMMENT:
      return {
        ...state,
        comments: action.payload,
      };
    default:
      return { ...state };
  }
}

export default rootReducer;
