const {Router} = require('express');
const router = Router();
const Search = require('../Controllers/Search')

const search = new Search()

router.get('/album', search.searchAlbumByName)

module.exports = router;