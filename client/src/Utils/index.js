const api = {
  baseUrl: "https://bragiproject.herokuapp.com/",
  registerUrl: "https://bragiproject.herokuapp.com/register/",
  registerValidateUrl: "https://bragiproject.herokuapp.com/register/validate",
  authenticateUrl: "https://bragiproject.herokuapp.com/validationUser/",
  loginUrl: "https://bragiproject.herokuapp.com/login",
  logoutUrl: "https://bragiproject.herokuapp.com/closeSessionUser",
  searchSongUrl: "https://bragiproject.herokuapp.com/song",
  searchGenreUrl: "https://bragiproject.herokuapp.com/genre",
  searchUrl: "https://bragiproject.herokuapp.com/searh",
  getUser: "https://bragiproject.herokuapp.com/profileUser/getData",
  searchSongByName: "https://bragiproject.herokuapp.com/search/song",
  searchAlbumByName: "https://bragiproject.herokuapp.com/search/album",
  searchArtistByName: "https://bragiproject.herokuapp.com/artist",
  deleteToken: "https://bragiproject.herokuapp.com/closeSessionUser",
  getTop10artist: "https://bragiproject.herokuapp.com/getTop10/artists",
  getTop10albums: "https://bragiproject.herokuapp.com/getTop10/albums",
  getTop10songs: "https://bragiproject.herokuapp.com/getTop10/songs",
  getAllPost: "https://bragiproject.herokuapp.com/post",
  userNewPost: "https://bragiproject.herokuapp.com/post",
  userUpdatePost: "https://bragiproject.herokuapp.com/post",
  deletePost: "https://bragiproject.herokuapp.com/post",
  getSongByID: "https://bragiproject.herokuapp.com/song/",
  getAlbumByID: "https://bragiproject.herokuapp.com/album/",
  getArtistByID: "https://bragiproject.herokuapp.com/artist/",
  getPhotoUser:
    "https://bragiproject.herokuapp.com/profileUser/getPhotoUser?userName=",
  changeUserToPremium:
    "https://bragiproject.herokuapp.com/changeUserType/toPremium",
  changeUserToArtist:
    "https://bragiproject.herokuapp.com/changeUserType/toArtist",
  updateBasicData:
    "https://bragiproject.herokuapp.com/profileUser/editionBasicProfile",
  updateSensitiveData:
    "https://bragiproject.herokuapp.com/profileUser/editionSensitiveProfile",
  getPhotoUser:
    "https://bragiproject.herokuapp.com/profileUser/getPhotoUser?userName=",
  getAllComments: "https://bragiproject.herokuapp.com/post/comments",
  userNewComment: "https://bragiproject.herokuapp.com/post/comment",
  userUpdateComment: "https://bragiproject.herokuapp.com/post/comment/edit",
  deleteComment: "https://bragiproject.herokuapp.com/post/comment",
  reportComment: "https://bragiproject.herokuapp.com/report/comment",
  reportPost: "https://bragiproject.herokuapp.com/report/post",
  reportUser: "https://bragiproject.herokuapp.com/report/user",
  followUser: "https://bragiproject.herokuapp.com/follow",
  likePost: "https://bragiproject.herokuapp.com/reactionHeart/likePost",
  dislikePost: "https://bragiproject.herokuapp.com/reactionHeart/dislikePost",
};

const apiLocal = {
  baseUrl: "http://localhost:3001/",
  registerUrl: "http://localhost:3001/register/",
  registerValidateUrl: "http://localhost:3001/register/validate",
  authenticateUrl: "http://localhost:3001/validationUser/",
  loginUrl: "http://localhost:3001/login",
  logoutUrl: "http://localhost:3001/closeSessionUser",
  searchSongUrl: "http://localhost:3001/song",
  searchGenreUrl: "http://localhost:3001/genre",
  searchUrl: "http://localhost:3001/searh",
  getUser: "http://localhost:3001/profileUser/getData",
  searchSongByName: "http://localhost:3001/search/song",
  searchAlbumByName: "http://localhost:3001/search/album",
  searchArtistByName: "http://localhost:3001/artist",
  deleteToken: "http://localhost:3001/closeSessionUser",
  getTop10artist: "http://localhost:3001/getTop10/artists",
  getTop10albums: "http://localhost:3001/getTop10/albums",
  getTop10songs: "http://localhost:3001/getTop10/songs",
  getAllPost: "http://localhost:3001/post",
  userNewPost: "http://localhost:3001/post",
  userUpdatePost: "http://localhost:3001/post",
  deletePost: "http://localhost:3001/post",
  getSongByID: "http://localhost:3001/song/",
  getAlbumByID: "http://localhost:3001/album/",
  getArtistByID: "http://localhost:3001/artist/",
  getPhotoUser: "http://localhost:3001/profileUser/getPhotoUser?userName=",
  changeUserToPremium: "http://localhost:3001/changeUserType/toPremium",
  changeUserToArtist: "http://localhost:3001/changeUserType/toArtist",
  updateBasicData: "http://localhost:3001/profileUser/editionBasicProfile",
  updateSensitiveData:
    "http://localhost:3001/profileUser/editionSensitiveProfile",
  getAllComments: "http://localhost:3001/post/comments",
  userNewComment: "http://localhost:3001/post/comments",
  userUpdateComment: "http://localhost:3001/post/comments/edit",
  deleteComment: "http://localhost:3001/post/comments",
  reportComment: "http://localhost:3001/report/comment",
  reportPost: "http://localhost:3001/report/post",
  reportUser: "http://localhost:3001/report/user",
  followUser: "http://localhost:3001/follow",
};

export default api;
