const {Router} = require('express');
const Report = require('../Controllers/Report');

const router = Router();
const report = new Report();

router.post('/comment', report.reportComment)
router.post('/post', report.reportPost)
router.post('/user', report.reportUser)

module.exports = router;