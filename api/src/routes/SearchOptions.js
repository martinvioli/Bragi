const {Router} = require('express');
const router = Router();
const Search = require('../Controllers/Search')

const search = new Search()

router.get('/song', search.searchSongByName)
router.get('/album', search.searchAlbumByName)
router.get('/artist', search.searchArtistByName)
router.get('/:nameUser', search.searchUser)

module.exports = router;