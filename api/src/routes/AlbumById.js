const {Router} = require('express');
const router = Router();
const Search = require('../Controllers/Search')

const search = new Search()

router.get('/:albumId', search.searchAlbumById)

module.exports = router;