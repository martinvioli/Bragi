const { Router } = require("express");
const register = require('./Register.js');
const validation = require('./Validation');
const login = require('./Login.js');
const { User } = require("../db");
const songById = require('./Song');
const artistById = require('./ArtistById');
const albumById = require('./AlbumById');
const genreById = require('./GenreById');
const searchOptions = require('./SearchOptions');
const profileData = require('./Profile.js');
const closeSessionUser = require('./CloseSessionUser');
const searchUser = require('./SearchUser');
const getTop10 = require('./Top10Options');
const follow = require('./FollowAction');
const unFollow = require('./UnfollowAction');
const postRoutes = require('./Post') ;
const changeUserType = require('./ChangeUserType');
const report = require('./Report');
const reactionHeart = require('./ReactionHeart');
const admin = require('./Admin');


// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
// Importar los models (provienen desde db.js... son los que definimos en la linea 61 aprox.)

const router = Router();

router.use('/register', register);
router.use('/validationUser', validation);
router.use('/login', login);
router.use('/song', songById);
router.use('/artist', artistById);
router.use('/album', albumById)
router.use('/search', searchOptions);
router.use('/profileUser', profileData);
router.use('/closeSessionUser', closeSessionUser);
router.use('/getTop10', getTop10);
router.use('/follow', follow);
router.use('/unfollow', unFollow);
router.use('/post', postRoutes);
router.use('/changeUserType', changeUserType);
router.use('/report', report );
router.use('/reactionHeart', reactionHeart);
router.use('/admin', admin);
module.exports = router;
