const { Router } = require("express");
const User = require("../Controllers/User.js");
const ProfileUser = require("../Controllers/ProfileUser.js");
const fileUpload = require("express-fileupload"); //Importación de paquete para la carga y devolución de fotos

const router = Router();
const user = new User();

router.put('/pre', user.resetPasswordPre);
router.put('/', user.resetPasswordPost);

module.exports = router;
