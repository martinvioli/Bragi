const {Router} = require('express');
const Follow = require('../Controllers/Follow.js');
const { verifyToken } = require('../middlewares/authjwt')


const router = Router();
const follow = new Follow();

router.post('/', follow.followAction)
router.get('/followers', follow.getFollowers)
router.get('/followeds', follow.getFolloweds)

module.exports = router;