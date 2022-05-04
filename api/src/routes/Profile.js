




const { Router } = require("express");
const User = require("../Controllers/User.js");
const ProfileUser = require("../Controllers/ProfileUser.js");

const router = Router();
const user = new User();
const profileUser = new ProfileUser();

router.post("/getData", user.getDataUser);
router.put("/editionBasicProfile", profileUser.editionBasicDataProfile);
router.put("/editionSensitiveProfile", profileUser.editionSensitiveDataProfile);

module.exports = router;
