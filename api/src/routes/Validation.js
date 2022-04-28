const { Router } = require("express");
const auth = require('../Validations/auths.js');

const router = Router();

router.post('/', auth.validateUserCode);

module.exports= router;