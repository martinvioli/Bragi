const { Router } = require("express");
const Admin = require("../Controllers/Admin");
const { verifyToken } = require("../middlewares/authjwt");

const router = Router();
const admin = new Admin();

//Estadisticas
router.get("/getUserStandar", admin.getUserStandar);
router.get("/getUserPremium", admin.getUserPremium);
router.get("/getUserArtist", admin.getUserArtist);

//Reports
router.get("/reports/reportsUser", admin.getUserReport);
router.get("/reports/reportsPost", admin.getPostReport);
router.get("/reports/reportsComment", admin.getCommentReport);
router.get("/reports/:idReport", admin.getReport);
router.post("/reports/deletePost", admin.deletePostReport);
router.post("/reports/allowPost", admin.allowPostReport);
router.post("/reports/deleteComment", admin.deleteCommentReport);
router.post("/reports/allowComment", admin.allowCommentReport);
router.get("/reports", admin.allReport);

//User Management
router.post("/banUser", admin.banUser);
router.post("/unbanUser", admin.unbanUser);

//Plan Premium
router.post("/premiumPlan/create", admin.creatPremiumPlan);
router.post("/premiumPlan/edition", admin.editPremiumPlan);
router.post("/premiumPlan/delete", admin.cancelPremiumPlan);

module.exports = router;
