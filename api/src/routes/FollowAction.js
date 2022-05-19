const { Router } = require("express");
const Follow = require("../Controllers/Follow.js");
const { verifyToken } = require("../middlewares/authjwt");

const router = Router();
const follow = new Follow();

router.post("/follow", follow.followAction);
router.post("/unfollow", follow.unFollowAction);
router.post("/followers", follow.getFollowers);
router.post("/followeds", follow.getFolloweds);

module.exports = router;
