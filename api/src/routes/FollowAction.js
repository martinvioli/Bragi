const {Router} = require('express');
const Follow = require('../Controllers/Follow.js');

const router = Router();
const follow = new Follow();

router.post('/', follow.followAction)
router.post('/unfollow', follow.unFollowAction)

module.exports = router;