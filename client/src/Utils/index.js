const api = {
  baseUrl: "http://localhost:3001/",
  registerUrl: "http://localhost:3001/register/",
  registerValidateUrl: "http://localhost:3001/register/validate",
  authenticateUrl: "http://localhost:3001/validationUser/",
  loginUrl: "http://localhost:3001/login",
  logoutUrl: "http://localhost:3001/closeSessionUser",
  searchSongUrl: "http://localhost:3001/song",
  searchGenreUrl: "http://localhost:3001/genre",
  searchUrl: "http://localhost:3001/searh",
  getUser: "http://localhost:3001/dataProfile",
  searchSongByName: "http://localhost:3001/search/song",
  searchAlbumByName: "http://localhost:3001/search/album",
  searchArtistByName: "http://localhost:3001/artist",
  deleteToken: "http://localhost:3001/closeSessionUser",
};

export default api;
