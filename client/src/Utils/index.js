const api = {
  baseUrl: "https://bragiproject.herokuapp.com/",
  registerUrl: "https://bragiproject.herokuapp.com/register/",
  registerValidateUrl: "https://bragiproject.herokuapp.com/register/validate",
  authenticateUrl: "https://bragiproject.herokuapp.com/validationUser/",
  loginUrl: "https://bragiproject.herokuapp.com/login",
  logoutUrl: "https://bragiproject.herokuapp.com/closeSessionUser",
  getUserByName: "https://bragiproject.herokuapp.com/search/",
  searchSongUrl: "https://bragiproject.herokuapp.com/song",
  searchGenreUrl: "https://bragiproject.herokuapp.com/genre",
  searchUrl: "https://bragiproject.herokuapp.com/searh",
  getUser: "https://bragiproject.herokuapp.com/profileUser/getData",
  getUserProfile: "https://bragiproject.herokuapp.com/profileUser/profile",
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
  getAllComments: "https://bragiproject.herokuapp.com/post/comments",
  userNewComment: "https://bragiproject.herokuapp.com/post/comment",
  userUpdateComment: "https://bragiproject.herokuapp.com/post/comment/edit",
  deleteComment: "https://bragiproject.herokuapp.com/post/comment",
  reportComment: "https://bragiproject.herokuapp.com/report/comment",
  reportPost: "https://bragiproject.herokuapp.com/report/post",
  reportUser: "https://bragiproject.herokuapp.com/report/user",
  followUser: "https://bragiproject.herokuapp.com/follow",
  unfollowUser: "https://bragiproject.herokuapp.com/unfollow",
  likePost: "https://bragiproject.herokuapp.com/reactionHeart/likePost",
  dislikePost: "https://bragiproject.herokuapp.com/reactionHeart/dislikePost",
  banUser: "https://bragiproject.herokuapp.com/admin/banUser",
  getAllStatistics: "https://bragiproject.herokuapp.com/admin/getAllStatistics",
  unbanUser: "https://bragiproject.herokuapp.com/admin/unbanUser",
  getAllStandarUsers: "https://bragiproject.herokuapp.com/admin/getUserStandar",
  getAllPremiumUsers: "https://bragiproject.herokuapp.com/admin/getUserPremium",
  getAllArtistUsers: "https://bragiproject.herokuapp.com/admin/getUserArtist",
  getAllReports: "https://bragiproject.herokuapp.com/admin/reports",
  getUserReports: "https://bragiproject.herokuapp.com/admin/reports/reportUser",
  getPostReports:
    "https://bragiproject.herokuapp.com/admin/reports/reportsPost",
  getCommentsReports:
    "https://bragiproject.herokuapp.com/admin/reports/reportsComment",
  getReportByID: "https://bragiproject.herokuapp.com/admin/reports/",
  adminDeletePost:
    "https://bragiproject.herokuapp.com/admin/reports/deletePost",
  adminAllowPost: "https://bragiproject.herokuapp.com/admin/reports/allowPost",
  adminDeleteComment:
    "https://bragiproject.herokuapp.com/admin/reports/deleteComment",
  adminAllowComment:
    "https://bragiproject.herokuapp.com/admin/reports/allowComment",
  createPremiumPlan:
    "https://bragiproject.herokuapp.com/admin/premiumPlan/create",
  editPremiumPlan:
    "https://bragiproject.herokuapp.com/admin/premiumPlan/edition",
  deletePremiumPlan:
    "https://bragiproject.herokuapp.com/admin/premiumPlan/delete",
  getAllAdminPosts: "https://bragiproject.herokuapp.com/admin/allPostAdmin",
  createAdminPost: "https://bragiproject.herokuapp.com/admin/createPostAdmin",
  editAdminPost: "https://bragiproject.herokuapp.com/admin/editPostAdmin",
  deleteAdminPost: "https://bragiproject.herokuapp.com/admin/deletePostAdmin",
  getAllBannedUsers: "https://bragiproject.herokuapp.com/admin/allBannedUser",
  forgottenPasswordPre:
    "https://bragiproject.herokuapp.com/recoverPassword/pre",
  forgottenPasswordPost: "https://bragiproject.herokuapp.com/recoverPassword",
};

const apiLocal = {
  baseUrl: "http://localhost:3001/",
  registerUrl: "http://localhost:3001/register/",
  registerValidateUrl: "http://localhost:3001/register/validate",
  authenticateUrl: "http://localhost:3001/validationUser/",
  loginUrl: "http://localhost:3001/login",
  logoutUrl: "http://localhost:3001/closeSessionUser",
  getUserByName: "http://localhost:3001/search/",
  searchSongUrl: "http://localhost:3001/song",
  searchGenreUrl: "http://localhost:3001/genre",
  searchUrl: "http://localhost:3001/searh",
  getUser: "http://localhost:3001/profileUser/getData",
  getUserProfile: "http://localhost:3001/profileUser/profile",
  searchSongByName: "http://localhost:3001/search/song",
  searchAlbumByName: "http://localhost:3001/search/album",
  searchArtistByName: "http://localhost:3001/artist",
  deleteToken: "http://localhost:3001/closeSessionUser",
  getTop10artist: "http://localhost:3001/getTop10/artists",
  getTop10albums: "http://localhost:3001/getTop10/albums",
  getTop10songs: "http://localhost:3001/getTop10/songs",
  getAllPost: "http://localhost:3001/post",
  changeTypeOfPost: "http://localhost:3001/post/changePostType",
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
  userNewComment: "http://localhost:3001/post/comment",
  userUpdateComment: "http://localhost:3001/post/comment/edit",
  deleteComment: "http://localhost:3001/post/comment",
  reportComment: "http://localhost:3001/report/comment",
  reportPost: "http://localhost:3001/report/post",
  reportUser: "http://localhost:3001/report/user",
  followUser: "http://localhost:3001/follow",
  unfollowUser: "http://localhost:3001/unfollow",
  likePost: "http://localhost:3001/reactionHeart/likePost",
  dislikePost: "http://localhost:3001/reactionHeart/dislikePost",
  banUser: "https://bragiproject.herokuapp.com/admin/banUser",
  unbanUser: "https://bragiproject.herokuapp.com/admin/unbanUser",
  getAllStandarUsers: "http://localhost:3001/admin/getUserStandar",
  getAllPremiumUsers: "http://localhost:3001/admin/getUserPremium",
  getAllArtistUsers: "http://localhost:3001/admin/getUserArtist",
  getAllReports: "http://localhost:3001/admin/reports",
  getUserReports: "http://localhost:3001/admin/reports/reportUser",
  getPostReports: "http://localhost:3001/admin/reports/reportsPost",
  getCommentsReports: "http://localhost:3001/admin/reports/reportsComment",
  getReportByID: "http://localhost:3001/admin/reports/",
  adminDeletePost: "http://localhost:3001/admin/reports/deletePost",
  adminAllowPost: "http://localhost:3001/admin/reports/allowPost",
  adminDeleteComment: "http://localhost:3001/admin/reports/deleteComment",
  adminAllowComment: "http://localhost:3001/admin/reports/allowComment",
  createPremiumPlan: "http://localhost:3001/admin/premiumPlan/create",
  editPremiumPlan: "http://localhost:3001/admin/premiumPlan/edition",
  deletePremiumPlan: "http://localhost:3001/admin/premiumPlan/delete",
  changeTypeOfPost: "http://localhost:3001/post/changePostType",
  disBanUser: "http://localhost:3001/admin/allowUser",
  getAllStatistics: "http://localhost:3001/admin/getAllStatistics",
  forgottenPasswordPre: "http://localhost:3001/recoverPassword/pre",
  forgottenPasswordPost: "http://localhost:3001/recoverPassword",
  getAllAdminPosts: "http://localhost:3001/admin/allPostAdmin",
  createAdminPost: "http://localhost:3001/admin/createPostAdmin",
  editAdminPost: "http://localhost:3001/admin/editPostAdmin",
  deleteAdminPost: "http://localhost:3001/admin/deletePostAdmin",
  getAllBannedUsers: "http://localhost:3001/admin/allBannedUser",
};

export default api;
