const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require("axios");
// Importar los models (provienen desde db.js... son los que definimos en la linea 61 aprox.)
const {} = require("../db.js");

const router = Router();
// Configurar los routers en caso de hacer routes importados.
// Ejemplo: router.use('/auth', authRouter)
// Sino, definir directamente aca abajo los router
// Ejemplo: router.get('/auth', async function(req,res){})..

module.exports = router;
