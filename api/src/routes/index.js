const { Router } = require("express");
const register = require('./routesModules/Register.js');
const { User } = require("../db")

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
// Importar los models (provienen desde db.js... son los que definimos en la linea 61 aprox.)

const router = Router();

router.use('/register', register);



module.exports = router;
