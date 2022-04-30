const { Router } = require("express");
const register = require('./Register.js');
const validation = require('./Validation');
const login = require('./Login.js');
const { User } = require("../db");
const songById = require('./Song');
const artistByName = require('./ArtistByName');
const genreById = require('./GenreById');
const searchOptions = require('./SearchOptions');
const profileData = require('./Profile.js');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
// Importar los models (provienen desde db.js... son los que definimos en la linea 61 aprox.)

const router = Router();

router.use('/register', register);
router.use('/validationUser', validation);
router.use('/login', login);
router.use('/song', songById);
router.use('/artist', artistByName);
router.use('/genre', genreById);
router.use('/search', searchOptions);
router.use('/dataProfile', profileData);

module.exports = router;
