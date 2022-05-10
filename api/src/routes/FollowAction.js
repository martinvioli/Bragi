const {Router} = require('express');
const Follow = require('../Controllers/Follow.js');
const { verifyToken } = require('../middlewares/authjwt')


const router = Router();
const follow = new Follow();

router.post('/', [verifyToken], follow.followAction)

module.exports = router;