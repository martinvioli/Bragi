const {Router} = require('express');
const router = Router();
const Search = require('../Controllers/Search')

const search = new Search()

router.get('/', search.searchSongByName)

module.exports = router;