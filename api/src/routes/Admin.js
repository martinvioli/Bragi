const { Router } = require("express");
const Admin = require("../Controllers/Admin");
const {verifyAdmin} = require("../middlewares/authjwt");

const router = Router();
const admin = new Admin();

//Estadisticas
router.get("/getUserStandar",[verifyAdmin],admin.getUserStandar);
router.get("/getUserPremium",[verifyAdmin], admin.getUserPremium);
router.get("/getUserArtist",[verifyAdmin], admin.getUserArtist);
router.get("/getActiveMembership",[verifyAdmin], admin.getPremiumActiveAccounts);
router.get("/getInactiveMembership",[verifyAdmin], admin.getPremiumInactiveAccounts);
router.get("/getDebtorMembership",[verifyAdmin], admin.getPremiumDebtorAccounts);
router.get("/getAllPostUsers",[verifyAdmin], admin.getAllPosts);

//Posteos Admin
router.get("/allPostAdmin",[verifyAdmin], admin.getPostsAdmin);
router.post("/createPostAdmin",[verifyAdmin], admin.createPostAdmin);
router.post("/editPostAdmin",[verifyAdmin], admin.updatePostAdmin);
router.post("/deletePostAdmin",[verifyAdmin], admin.deletePostAdmin);

//Reports
router.get("/reports/reportsUser",[verifyAdmin], admin.getUserReport);
router.get("/reports/reportsPost",[verifyAdmin], admin.getPostReport);
router.get("/reports/reportsComment",[verifyAdmin], admin.getCommentReport);
router.get("/reports/:idReport",[verifyAdmin], admin.getReport);
router.post("/reports/deletePost",[verifyAdmin], admin.deletePostReport);
router.post("/reports/allowPost",[verifyAdmin], admin.allowPostReport);
router.post("/reports/deleteComment",[verifyAdmin], admin.deleteCommentReport);
router.post("/reports/allowComment",[verifyAdmin], admin.allowCommentReport);
router.get("/reports",[verifyAdmin], admin.allReport);

//User Management
router.get("/allBannedUser",[verifyAdmin], admin.getAllBannedUser);
router.post("/banUser",[verifyAdmin], admin.banUser);
router.post("/unbanUser",[verifyAdmin], admin.unbanUser);

//Plan Premium
router.post("/premiumPlan/create",[verifyAdmin], admin.creatPremiumPlan);
router.post("/premiumPlan/edition",[verifyAdmin], admin.editPremiumPlan);
router.post("/premiumPlan/delete",[verifyAdmin], admin.cancelPremiumPlan);
router.get("/premiumPlan/premiumPlans", admin.getPremiumPlan);

module.exports = router;
