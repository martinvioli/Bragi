const {Router} = require('express');
const router = Router();
const Search = require('../Controllers/Search');
const { verifyToken } = require('../middlewares/authjwt')


const search = new Search()

router.get('/songs', [verifyToken], search.getTop10songs)
router.get('/albums', [verifyToken], search.getTop10albums)
router.get('/artists', [verifyToken], search.getTop10artists)
module.exports = router;