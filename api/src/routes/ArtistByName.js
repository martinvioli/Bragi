const {Router} = require('express');
const router = Router();
const Search = require('../Controllers/Search')

const search = new Search()

router.get('/:name', search.searchArtistByName)

module.exports = router;