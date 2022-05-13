const { Router } = require('express');
const Admin = require('../Controllers/Admin');
const { verifyToken } = require('../middlewares/authjwt')


const router = Router();
const admin = new Admin()

//Estadisticas
router.get('/getUserStandar', admin.getUserStandar);
router.get('/getUserPremium', admin.getUserPremium);
router.get('/getUserArtist', admin.getUserArtist);

//Reports
router.get('/reports/reportsUser', admin.getUserReport);
router.get('/reports/reportsPost', admin.getPostReport);
router.get('/reports/reportsComment', admin.getCommentReport);
router.get('/reports/:idReport', admin.getReport);
router.get('/reports', admin.allReport);

//User Management




module.exports = router;