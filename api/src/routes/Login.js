const {Router} = require('express');
const User = require('../Controllers/User.js');

const router = Router();
const user = new User();

router.post('/', user.loginUser)

module.exports = router;