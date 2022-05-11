const {Router} = require('express');
const User = require('../Controllers/User.js');
const { verifyToken } = require('../middlewares/authjwt')


const router = Router();
const user = new User();

router.post('/', user.closeSessionUser)

module.exports = router;