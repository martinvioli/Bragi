const {Router} = require('express');
const ReportPCU = require('../Controllers/ReportPCU');
const { verifyToken } = require('../middlewares/authjwt')


const router = Router();
const reportPCU = new ReportPCU();

router.post('/comment', reportPCU.reportComment);
router.post('/post', reportPCU.reportPost);
router.post('/user', reportPCU.reportUser);

module.exports = router;