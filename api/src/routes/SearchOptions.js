const {Router} = require('express');
const router = Router();
const Search = require('../Controllers/Search');
const { verifyToken } = require('../middlewares/authjwt')


const search = new Search()

router.get('/song', [verifyToken], search.searchSongByName)
router.get('/album', [verifyToken], search.searchAlbumByName)
router.get('/artist', [verifyToken], search.searchArtistByName)

module.exports = router;