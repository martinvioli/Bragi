const {Router} = require('express');
const User = require('../Controllers/User.js');

const router = Router();
const user = new User();

router.post('/toArtist', user.changeUserToArtist)
router.post('/toPremium', user.changeUserToPremium)
router.post('/toStandard', user.changeUserToStandard)

module.exports = router;