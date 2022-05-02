const {Router} = require('express');
const User = require('../Controllers/User.js');

const router = Router();
const user = new User();

router.get('/', user.closeSessionUser)

module.exports = router;