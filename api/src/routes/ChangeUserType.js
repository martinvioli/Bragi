const {Router} = require('express');
const User = require('../Controllers/User.js');
const { verifyToken } = require('../middlewares/authjwt')


const router = Router();
const user = new User();

router.post('/toArtist', [verifyToken], user.changeUserToArtist)
router.post('/toPremium', [verifyToken], user.changeUserToPremium)
router.post('/toStandard', [verifyToken], user.changeUserToStandard)

module.exports = router;