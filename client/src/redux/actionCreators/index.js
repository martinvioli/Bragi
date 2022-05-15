import {
  CREATE_USER,
  LOG_IN,
  GET_TOKEN,
  GET_USER,
  GET_SONG_BY_NAME,
  GET_ALBUM_BY_NAME,
  GET_ARTIST_BY_NAME,
  GET_USER_BY_NAME,
  CLEAR_DATA,
  GET_TOP_10_SONGS,
  GET_TOP_10_ARTISTS,
  GET_TOP_10_ALBUMS,
  GET_ALL_POST,
  USER_NEW_POST,
  USER_UPDATE_POST,
  DELETE_POST,
  GET_SONG_BY_ID,
  GET_ALBUM_BY_ID,
  GET_ARTIST_BY_ID,
  CLEAR_DETAILS,
  GET_PHOTO_USER,
  //POST_FOLLOW_NOTIFICATION,
  GET_ALL_COMMENT,
  //USER_NEW_COMMENT,
  USER_UPDATE_COMMENT,
  DELETE_COMMENT,
  FOLLOW_USER,
  UNFOLLOW_USER,
  LIST_FOLLOWED,
  LIST_FOLLOWERS,
  FALSE_DISLIKE,
  FALSE_LIKE,
  GET_USER_PROFILE,
  GET_OWN_POSTS,
  POST_REEPLACER,
  BAN_USER,
  GET_REPORTS,
  MODIFY_PLANS_PREMIUMS,
  FALSE_ADDCOMENT,
  FALSE_ADDCOMENTPROFILE,
  // CLEAN_DETAIL_TOP10,
  UNBAN_USER,
  GET_STANDARD_USERS,
  GET_PREMIUM_USERS,
  GET_ARTIST_USERS,
  GET_REPORT_BY_ID,
  GET_USER_REPORTS,
  GET_POST_REPORTS,
  GET_COMMENT_REPORTS,
  ADMIN_DELETE_POST,
  ADMIN_ALLOW_POST,
  ADMIN_DELETE_COMMENT,
  ADMIN_ALLOW_COMMENT,
  CREATE_PLANS_PREMIUMS,
  DELETE_PLANS_PREMIUMS,
  CLEAN_DETAIL_TOP10,
  FORGOTTEN_PASSWORD_PRE,
  FORGOTTEN_PASSWORD_POST,
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

// export const getPhotoUser = (username) => {
//   return async (dispatch) => {
//     const response = await axios.post(`${api.getPhotoUser}${username}`);
//     return dispatch({
//       type: GET_PHOTO_USER,
//       payload: response.data,
//     });
//   };
// };

export const getPhotoUser = (userName) => {
  return {
    type: GET_PHOTO_USER,
    payload: userName,
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

//---------------------------------------------------------------------------------------------------------------------------------------------------
//_ SEARCHBAR OPTIONS
//---------------------------------------------------------------------------------------------------------------------------------------------------
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

export const getUserByName = function (nameUser) {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${api.getUserByName}${nameUser}`);
      return dispatch({
        type: GET_USER_BY_NAME,
        payload: response.data,
      });
    } catch (error) {
      return error;
    }
  };
};

//---------------------------------------------------------------------------------------------------------------------------------------------------
//_ TOP 10 OPTIONS
//---------------------------------------------------------------------------------------------------------------------------------------------------
export const getTop10Songs = function () {
  return async (dispatch) => {
    try {
      const response = await axios.get(api.getTop10songs);
      console.log(response.data);
      return dispatch({
        type: GET_TOP_10_SONGS,
        payload: response.data,
      });
    } catch (e) {
      console.log(e);
    }
  };
};

export const getTop10artist = function () {
  return async (dispatch) => {
    try {
      const response = await axios.get(api.getTop10artist);
      console.log(response.data);
      return dispatch({
        type: GET_TOP_10_ARTISTS,
        payload: response.data,
      });
    } catch (e) {
      console.log(e);
    }
  };
};

export const getTop10albums = function () {
  return async (dispatch) => {
    try {
      const response = await axios.get(api.getTop10albums);
      console.log(response.data);

      return dispatch({
        type: GET_TOP_10_ALBUMS,
        payload: response.data,
      });
    } catch (e) {
      console.log(e);
    }
  };
};

export const clearData = function () {
  return {
    type: CLEAR_DATA,
  };
};

//---------------------------------------------------------------------------------------------------------------------------------------------------
//_ CRUD - POST
//---------------------------------------------------------------------------------------------------------------------------------------------------
export const getAllPost = function () {
  return async (dispatch) => {
    try {
      const response = await axios.get(api.getAllPost);
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
export const userNewPost = function (input) {
  return async (dispatch) => {
    try {
      const response = await axios.post(api.userNewPost, input);
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
export const userUpdatePost = function (idPost) {
  return async (dispatch) => {
    try {
      const response = await axios.put(`${api.userUpdatePost}/${idPost}`);
      console.log(response.data);
      return dispatch({
        type: USER_UPDATE_POST,
        payload: response.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};
export const deletePost = function (idPost) {
  return async (dispatch) => {
    try {
      const response = await axios.delete(`${api.deletePost}/${idPost}`);
      console.log(response.data);
      return dispatch({
        type: DELETE_POST,
        payload: response.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const getOwnPosts = function (userName) {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${api.getAllPost}/${userName}/posts`);
      return dispatch({
        type: GET_OWN_POSTS,
        payload: response.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const postReeplacer = function () {
  return { type: POST_REEPLACER };
};

//---------------------------------------------------------------------------------------------------------------------------------------------------
//_ COMMENTS
//---------------------------------------------------------------------------------------------------------------------------------------------------

export const getAllComments = function (idPost) {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${api.getAllComments}/${idPost}`);
      console.log(response.data);
      return dispatch({
        type: GET_ALL_COMMENT,
        payload: response.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const userNewComment = function (input) {
  return async (dispatch) => {
    try {
      const response = await axios.post(api.userNewComment, input);
      console.log(response.data);
      return dispatch(getAllComments(input.idPost));
    } catch (error) {
      console.log(error);
    }
  };
};
export const userUpdateComment = function (idPost) {
  return async (dispatch) => {
    try {
      const response = await axios.put(`${api.userUpdateComment}/${idPost}`);
      console.log(response.data);
      return dispatch({
        type: USER_UPDATE_COMMENT,
        payload: response.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};
export const deleteComment = function (idComment) {
  return async (dispatch) => {
    try {
      const response = await axios.delete(`${api.deleteComment}/${idComment}`);
      console.log(response.data);
      return dispatch({
        type: DELETE_COMMENT,
        payload: response.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const falseAddComment = function (payload) {
  return { type: FALSE_ADDCOMENT, payload };
};

export const falseAddComentProfile = function (payload) {
  return { type: FALSE_ADDCOMENTPROFILE, payload };
};

/////////////////////////////////////
////////////////////////////////////
//               DETAILS OPTIONS

export const getSongByID = (id) => {
  return async (dispatch) => {
    const response = await axios.get(`${api.getSongByID}${id}`);
    console.log(response.data);
    return dispatch({
      type: GET_SONG_BY_ID,
      payload: response.data,
    });
  };
};

export const getAlbumByID = (id) => {
  return async (dispatch) => {
    const response = await axios.get(`${api.getAlbumByID}${id}`);
    console.log(response.data);
    return dispatch({
      type: GET_ALBUM_BY_ID,
      payload: response.data,
    });
  };
};

export const getArtistByID = (id) => {
  return async (dispatch) => {
    const response = await axios.get(`${api.getArtistByID}${id}`);
    console.log(response.data);
    return dispatch({
      type: GET_ARTIST_BY_ID,
      payload: response.data,
    });
  };
};

export const clearDetails = () => {
  return { type: CLEAR_DETAILS };
};

//-----------------------------------------------------------------------------
//_ FOLLOW AND UNFOLLOW
//-----------------------------------------------------------------------------

export const followUser = (obj) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(api.followUser, obj);
      console.log(response.data);
      return dispatch({
        type: FOLLOW_USER,
        payload: response.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};
export const unfollowUser = (obj) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(api.unfollowUser, obj);
      console.log(response.data);
      return dispatch({
        type: UNFOLLOW_USER,
        payload: response.data,
      });
    } catch (error) {
      console.error(error);
    }
  };
};

export const listFollowed = (userName) => {
  return async (dispatch) => {
    try {
      console.log(userName);
      const response = await axios.post(
        "http://localhost:3001/follow/followeds",
        { userName: userName }
      );
      console.log(response.data);
      return dispatch({
        type: LIST_FOLLOWED,
        payload: response.data,
      });
    } catch (error) {
      console.error(error);
    }
  };
};

export const listFollowers = (userName) => {
  return async (dispatch) => {
    try {
      console.log(userName);
      const response = await axios.post(
        "http://localhost:3001/follow/followers",
        { userName: userName }
      );
      console.log(response.data);
      return dispatch({
        type: LIST_FOLLOWERS,
        payload: response.data,
      });
    } catch (error) {
      console.error(error);
    }
  };
};
//////////////////////////////////////
// == LIKES == //
/////////////////////////////////////

export const falseLike = (payload) => {
  return { type: FALSE_LIKE, payload };
};

export const falseDislike = (payload) => {
  return { type: FALSE_DISLIKE, payload };
};

export const like = function (payload) {
  return async () => {
    try {
      const response = await axios.post(api.likePost, payload);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };
};

export const dislike = function (payload) {
  return async () => {
    try {
      const response = await axios.post(api.dislikePost, payload);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };
};

//////////////////////
// == VER PERFIL DE OTRO USER == //
//////////////////////

export const getUseProfile = (token, userName) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(api.getUserProfile, {
        token,
        userName,
      });
      console.log(response.data);
      return dispatch({
        type: GET_USER_PROFILE,
        payload: response.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

//-----------------------------------------------------------------------------
//_ ADMIN
//-----------------------------------------------------------------------------

export const banUser = (id) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(api.banUser, id);
      console.log(response.data);
      return dispatch({ type: BAN_USER, payload: response.data });
    } catch (error) {
      console.log(error);
    }
  };
};
export const UnbanUser = (id) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(api.disBanUser, id);
      console.log(response.data);
      return dispatch({ type: UNBAN_USER, payload: response.data });
    } catch (error) {
      console.log(error);
    }
  };
};

export const getStandarUsers = () => {
  return async (dispatch) => {
    const response = await axios.get(api.getAllStandarUsers);
    console.log(response.data);
    return dispatch({
      type: GET_STANDARD_USERS,
      payload: response.data,
    });
  };
};

export const getPremiumUsers = () => {
  return async (dispatch) => {
    const response = await axios.get(api.getAllPremiumUsers);
    console.log(response.data);
    return dispatch({
      type: GET_PREMIUM_USERS,
      payload: response.data,
    });
  };
};

export const getArtistUsers = () => {
  return async (dispatch) => {
    const response = await axios.get(api.getAllArtistUsers);
    console.log(response.data);
    return dispatch({
      type: GET_ARTIST_USERS,
      payload: response.data,
    });
  };
};

export const getAllReports = () => {
  return async (dispatch) => {
    const response = await axios.get(api.getAllReports);
    return dispatch({
      type: GET_REPORTS,
      payload: response.data,
    });
  };
};

export const getUserReports = () => {
  return async (dispatch) => {
    const response = await axios.get(api.getUserReports);
    console.log(response.data);
    return dispatch({
      type: GET_USER_REPORTS,
      payload: response.data,
    });
  };
};

export const getPostReports = () => {
  return async (dispatch) => {
    const response = await axios.get(api.getPostReports);
    console.log(response.data);
    return dispatch({
      type: GET_POST_REPORTS,
      payload: response.data,
    });
  };
};

export const getReportByID = (id) => {
  return async (dispatch) => {
    const response = await axios.get(`${api.getReportByID}${id}`);
    console.log(response.data);
    return dispatch({
      type: GET_REPORT_BY_ID,
      payload: response.data,
    });
  };
};

export const getCommentReports = () => {
  return async (dispatch) => {
    const response = await axios.get(api.getCommentsReports);
    console.log(response.data);
    return dispatch({
      type: GET_COMMENT_REPORTS,
      payload: response.data,
    });
  };
};

export const adminDeletePost = (id) => {
  return async (dispatch) => {
    const response = await axios.post(api.adminDeletePost, id);
    console.log(response.data);
    return dispatch({
      type: ADMIN_DELETE_POST,
      payload: response.data,
    });
  };
};

export const adminAllowPost = (id) => {
  return async (dispatch) => {
    const response = await axios.post(api.adminAllowPost, id);
    console.log(response.data);
    return dispatch({
      type: ADMIN_ALLOW_POST,
      payload: response.data,
    });
  };
};

export const adminDeleteComment = (id) => {
  return async (dispatch) => {
    const response = await axios.post(api.adminDeleteComment, id);
    console.log(response.data);
    return dispatch({
      type: ADMIN_DELETE_COMMENT,
      payload: response.data,
    });
  };
};

export const adminAllowComment = (id) => {
  return async (dispatch) => {
    const response = await axios.post(api.adminAllowComment, id);
    console.log(response.data);
    return dispatch({
      type: ADMIN_ALLOW_COMMENT,
      payload: response.data,
    });
  };
};

export const modifyPlansPremiums = (plan) => {
  return async (dispatch) => {
    const response = await axios.post(api.editPremiumPlan, plan);
    return dispatch({
      type: MODIFY_PLANS_PREMIUMS,
      payload: response.data,
    });
  };
};

export const createPlansPremiums = (plan) => {
  return async (dispatch) => {
    const response = await axios.post(api.editPremiumPlan, plan);
    return dispatch({
      type: CREATE_PLANS_PREMIUMS,
      payload: response.data,
    });
  };
};

export const deletePlansPremiums = (plan) => {
  return async (dispatch) => {
    const response = await axios.post(api.editPremiumPlan, plan);
    return dispatch({
      type: DELETE_PLANS_PREMIUMS,
      payload: response.data,
    });
  };
};
// recuperar contraseña

export const forgottenPasswordPre = function (userName, email) {
  return async (dispatch) => {
    try {
      const response = await axios.post(api.forgottenPasswordPre, email);
      console.log(response.data);
      return dispatch({
        type: FORGOTTEN_PASSWORD_PRE,
        payload: response.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const forgottenPasswordPost = function (userName, email) {
  return async (dispatch) => {
    try {
      const response = await axios.put(api.forgottenPassword, userName, email);
      console.log(response.data);
      return dispatch({
        type: FORGOTTEN_PASSWORD_POST,
        payload: response.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};
