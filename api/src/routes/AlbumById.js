const {Router} = require('express');
const router = Router();
const Search = require('../Controllers/Search');
const { verifyToken } = require('../middlewares/authjwt')


const search = new Search()

router.get('/:albumId', [verifyToken], search.searchAlbumById)

module.exports = router;