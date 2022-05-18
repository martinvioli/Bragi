const {Router} = require('express');
const Pay = require('../Controllers/Pay');

const router = Router();
const pay = new Pay();

router.post('/', pay.payment);
router.post('/sub', pay.sub)

module.exports = router;