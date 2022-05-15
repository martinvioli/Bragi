const {Router} = require('express');
const Pay = require('../Controllers/Pay');

const router = Router();
const pay = new Pay();

router.post('/', pay.payment)

module.exports = router;