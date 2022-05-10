const {Router} = require('express');
const router = Router();
const Search = require('../Controllers/Search');
const { verifyToken } = require('../middlewares/authjwt')


const search = new Search()

router.get('/:songId', [verifyToken], search.searchSongById)

module.exports = router;