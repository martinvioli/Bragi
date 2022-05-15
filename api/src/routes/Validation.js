const { Router } = require("express");
const auth = require('../Validations/auths.js');

const router = Router();

router.post('/', auth.validateUserCode);
router.post('/reset', auth.validateEmailReset)
router.post('/codeValidation', auth.validateCodeReset)

module.exports= router;