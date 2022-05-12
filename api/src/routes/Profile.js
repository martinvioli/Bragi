const { Router } = require("express");
const User = require("../Controllers/User.js");
const ProfileUser = require("../Controllers/ProfileUser.js");
const fileUpload = require('express-fileupload'); //Importación de paquete para la carga y devolución de fotos
const { verifyToken } = require('../middlewares/authjwt')


const router = Router();
const user = new User();
const profileUser = new ProfileUser();

router.use(fileUpload());
router.post("/getData", user.getDataUser);
router.post("/profile", user.getProfileUser);
router.get("/getPhotoUser", user.getPhotoUser);
router.put("/editionBasicProfile", profileUser.editionBasicDataProfile);
router.put("/editionSensitiveProfile", profileUser.editionSensitiveDataProfile);

module.exports = router;
