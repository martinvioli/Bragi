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
};

export default api;
