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
  GET_USER_BY_NAME,
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
  USER_UPDATE_COMMENT,
  DELETE_COMMENT,
  FOLLOW_USER,
  FALSE_LIKE,
  FALSE_DISLIKE,
  GET_USER_PROFILE,
  UNFOLLOW_USER,
  LIST_FOLLOWED,
  LIST_FOLLOWERS,
  GET_OWN_POSTS,
  POST_REEPLACER,
  GET_STATISTICS,
  BAN_USER,
  GET_REPORTS,
  FALSE_ADDCOMENT,
  FALSE_ADDCOMENTPROFILE,
<<<<<<< HEAD
  // CLEAN_DETAIL_TOP10,
  UNBAN_USER,
  GET_COMMENT_REPORTS,
  GET_POST_REPORTS,
  GET_USER_REPORTS,
  GET_REPORT_BY_ID,
  GET_ARTIST_USERS,
  GET_PREMIUM_USERS,
  GET_STANDARD_USERS,
  ADMIN_DELETE_POST,
  ADMIN_ALLOW_POST,
  ADMIN_DELETE_COMMENT,
  ADMIN_ALLOW_COMMENT,
  MODIFY_PLANS_PREMIUMS,
  CREATE_PLANS_PREMIUMS,
  DELETE_PLANS_PREMIUMS,
=======
  CLEAN_DETAIL_TOP10,
  FORGOTTEN_PASSWORD_PRE
>>>>>>> ab93d21db11d124c02968adead5133b76b314bf3
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
  usersList: [],
  topSongs: [],
  topArtists: [],
  topAlbums: [],
  songById: {},
  albumById: {},
  artistById: {},
  profileImage: "",
  comments: [],
  followed: [],
  unfollowed: [],
  listFollowed: [],
  listFollowers: [],
  userProfile: {},
  ownPosts: [],
  banned: [],
  unbanned: [],
  standardUsers: [],
  premiumUsers: [],
  artistUsers: [],
  reports: [],
<<<<<<< HEAD
  userReports: [],
  postReports: [],
  commentReports: [],
  report: {},
  adminDeletePost: {},
  adminAllowPost: {},
  adminDeleteComment: {},
  adminAllowComment: {},
  createPremiumPlan: {},
  modifyPremiumPlan: {},
  deletePremiumPlan: {},
=======
  email:"",
  code:""
>>>>>>> ab93d21db11d124c02968adead5133b76b314bf3
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
    case GET_USER_BY_NAME:
      return {
        ...state,
        usersList: [action.payload],
      };
    case CLEAR_DATA:
      return {
        ...state,
        song: [],
        album: [],
        artist: [],
        topSongs: [],
        topArtists: [],
        topAlbums: [],
        usersList: [],
      };
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
      return {
        ...state,
        comments: action.payload,
      };
    case FALSE_ADDCOMENT:
      var addComment = [...state.posts];
      addComment.splice(action.payload, 1, {
        ...state.posts[action.payload],
        Comments: [...state.posts[action.payload].Comments].concat({
          falseComment: true,
        }),
      });
      return {
        ...state,
        posts: addComment,
      };
    case FALSE_ADDCOMENTPROFILE:
      var addCommentProfile = [...state.userProfile.Posts];
      addCommentProfile.splice(action.payload, 1, {
        ...state.userProfile.Posts[action.payload],
        Comments: [...state.userProfile.Posts[action.payload].Comments].concat({
          falseComment: true,
        }),
      });
      return {
        ...state,
        userProfile: { ...state.userProfile, Posts: addCommentProfile },
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
    case FOLLOW_USER:
      return {
        ...state,
        followed: action.payload,
      };
    case UNFOLLOW_USER:
      return {
        ...state,
        unfollowed: action.payload,
      };

    case LIST_FOLLOWED:
      return {
        ...state,
        listFollowed: action.payload,
      };
    case LIST_FOLLOWERS:
      return {
        ...state,
        listFollowers: action.payload,
      };
    case FALSE_LIKE:
      var postsEditable = [...state.posts];
      postsEditable[action.payload.index].Likes.push({
        userName: action.payload.userName,
      });
      return {
        ...state,
        posts: postsEditable,
      };
    case FALSE_DISLIKE:
      var postsEditable2 = [...state.posts];
      postsEditable2[action.payload.index].Likes = postsEditable2[
        action.payload.index
      ].Likes.filter((e) => e.userName !== action.payload.userName);
      return {
        ...state,
        posts: postsEditable2,
      };
    case GET_USER_PROFILE:
      return {
        ...state,
        userProfile: action.payload,
      };
    case GET_OWN_POSTS:
      return {
        ...state,
        ownPosts: action.payload,
      };
    case POST_REEPLACER:
      return {
        ...state,
        posts: state.userProfile.Posts,
      };
    case BAN_USER:
      return {
        ...state,
        banned: action.payload,
      };
    case UNBAN_USER:
      return {
        ...state,
        unbanned: action.payload,
      };
    case GET_REPORTS:
      return {
        ...state,
        reports: action.payload,
      };
    case GET_COMMENT_REPORTS:
      return {
        ...state,
        commentReports: action.payload,
      };
    case GET_POST_REPORTS:
      return {
        ...state,
        postReports: action.payload,
      };
    case GET_USER_REPORTS:
      return {
        ...state,
        userReports: action.payload,
      };
    case GET_REPORT_BY_ID:
      return {
        ...state,
        report: action.payload,
      };
    case GET_ARTIST_USERS:
      return {
        ...state,
        artistUsers: action.payload,
      };
    case GET_PREMIUM_USERS:
      return {
        ...state,
        premiumUsers: action.payload,
      };
    case GET_STANDARD_USERS:
      return {
        ...state,
        standardUsers: action.payload,
      };
    case ADMIN_DELETE_POST:
      return {
        ...state,
        adminDeletePost: action.payload,
      };

    case ADMIN_ALLOW_POST:
      return {
        ...state,
        adminAllowPost: action.payload,
      };

    case ADMIN_DELETE_COMMENT:
      return {
        ...state,
        adminDeleteComment: action.payload,
      };

    case ADMIN_ALLOW_COMMENT:
      return {
        ...state,
        adminAllowComment: action.payload,
      };
    case MODIFY_PLANS_PREMIUMS:
      return {
        ...state,
        modifyPremiumPlan: action.payload,
      };

    case CREATE_PLANS_PREMIUMS:
      return {
        ...state,
        createPremiumPlan: action.payload,
      };

    case DELETE_PLANS_PREMIUMS:
      return {
        ...state,
        deletePremiumPlan: action.payload,
      };

    case FORGOTTEN_PASSWORD_PRE:
      return{
        ...state,
        email: action.payload
      };
    default:
      return { ...state };
  }
}

export default rootReducer;
