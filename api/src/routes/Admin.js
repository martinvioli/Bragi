const { Router } = require('express');
const Admin = require('../Controllers/Admin');
const { verifyToken } = require('../middlewares/authjwt')


const router = Router();
const admin = new Admin()

router.get('/getUserStandar', admin.getUserStandar);
router.get('/getUserPremium', admin.getUserPremium);
router.get('/getUserArtist', admin.getUserArtist);

module.exports = router;