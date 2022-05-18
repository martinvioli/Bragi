const {Router} = require('express');
const User = require('../Controllers/User.js');
const { verifyToken } = require('../middlewares/authjwt')


const router = Router();
const user = new User();

router.post('/emailReasonToArtist', user.justificationForBecomingAnArtist)
router.post('/toArtist', user.changeUserToArtist)
router.post('/toPremium', user.changeUserToPremium)
router.post('/toStandard', user.changeUserToStandard)

module.exports = router;