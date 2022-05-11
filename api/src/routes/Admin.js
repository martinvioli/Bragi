const { Router } = require('express');
const User = require('../Controllers/User');
const { verifyToken } = require('../middlewares/authjwt')


const router = Router();
const user = new User();

router.get('/', user.getAllUsers);

module.exports = router;