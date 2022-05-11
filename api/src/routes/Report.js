const {Router} = require('express');
const RowReport = require('../Controllers/RowReport');
const { verifyToken } = require('../middlewares/authjwt')


const router = Router();
const rowReport = new RowReport();

router.post('/comment', rowReport.reportComment)
router.post('/post', rowReport.reportPost)
router.post('/user', rowReport.reportUser)

module.exports = router;