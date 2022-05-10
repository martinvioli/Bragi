const {Router} = require('express');
const RowReport = require('../Controllers/RowReport');
const { verifyToken } = require('../middlewares/authjwt')


const router = Router();
const rowReport = new RowReport();

router.post('/comment', [verifyToken], rowReport.reportComment)
router.post('/post', [verifyToken], rowReport.reportPost)
router.post('/user', [verifyToken], rowReport.reportUser)

module.exports = router;