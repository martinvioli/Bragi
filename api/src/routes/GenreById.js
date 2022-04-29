const {Router} = require('express');
const router = Router();
const Search = require('../Controllers/Search')

const search = new Search()

router.get('/:genreId', search.searchGenreById)

module.exports = router;