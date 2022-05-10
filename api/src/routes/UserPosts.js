const { Router } = require('express');
const User = require('../Controllers/User');
const { verifyToken } = require('../middlewares/authjwt')

const router = Router();
const user = new User();

router.get('/:id/posts', [verifyToken],  user.getUserPosts);

module.exports = router;