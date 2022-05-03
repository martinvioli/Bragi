import {
  CREATE_USER,
  LOG_IN,
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
import axios from "axios";
import api from "../../Utils";

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

export const getToken = function (token) {
  return {
    type: GET_TOKEN,
    payload: token,
  };
};

export const getUser = function (token) {
  return async (dispatch) => {
    const response = await axios.post(api.getUser, { token });
    console.log(response.data);
    return dispatch({
      type: GET_USER,
      payload: response.data,
    });
  };
};

export const getSongByName = function (name) {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `${api.searchSongByName}?songName=${name}`
      );
      console.log(response.data);
      return dispatch({
        type: GET_SONG_BY_NAME,
        payload: response.data,
      });
    } catch (e) {
      console.log(e);
    }
  };
};

export const getAlbumByName = function (name) {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `${api.searchAlbumByName}?albumName=${name}`
      );
      console.log(response.data);
      return dispatch({
        type: GET_ALBUM_BY_NAME,
        payload: response.data,
      });
    } catch (e) {
      console.log(e);
    }
  };
};

export const getArtistByName = function (name) {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${api.searchArtistByName}/${name}`);
      console.log(response.data);
      return dispatch({
        type: GET_ARTIST_BY_NAME,
        payload: response.data,
      });
    } catch (error) {
      return error;
    }
  };
};

export const clearData = function () {
  return {
    type: CLEAR_DATA,
  };
};

export const userNewPost = function (input) {
  return async (dispatch) => {
    try {
      const response = await axios.post("url back", input);
      console.log(response.data);
      return dispatch({
        type: USER_NEW_POST,
        payload: response.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};
export const getAllPost = function () {
  return async (dispatch) => {
    try {
      const response = await axios.get("url back");
      console.log(response.data);
      return dispatch({
        type: GET_ALL_POST,
        payload: response.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};
export const getSongsMorePLayed = function () {
  return async (dispatch) => {
    try {
      const response = await axios.get("url back");
      const result = response.data;
      dispatch({ type: SONGS_MORE_PLAYED, payload: result });
    } catch (err) {
      console.log(err);
    }
  };
};
