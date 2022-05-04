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
  getUser: "http://localhost:3001/profileUser/getData",
  searchSongByName: "http://localhost:3001/search/song",
  searchAlbumByName: "http://localhost:3001/search/album",
  searchArtistByName: "http://localhost:3001/artist",
  deleteToken: "http://localhost:3001/closeSessionUser",
  getTop10artist: "http://localhost:3001/getTop10/artists",
  getTop10albums: "http://localhost:3001/getTop10/albums",
  getTop10songs: "http://localhost:3001/getTop10/songs",
};

const post = {
  input: "El contenido del post",
  link: ["arreglo de string para los links del post"],
  token: "el token del usuario",
};

export default api;
