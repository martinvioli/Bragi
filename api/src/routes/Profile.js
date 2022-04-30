const { Router } = require("express");
const User = require("../Controllers/User.js");
7;

const router = Router();
const user = new User();

router.post("/", user.getDataUser);

module.exports = router;
