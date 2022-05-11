const { Router } = require("express");
const Reaction = require("../Controllers/ReactionPostComment");
const { verifyToken } = require("../middlewares/authjwt");

const router = Router();
const reaction = new Reaction();

router.post("/likePost", reaction.likePost);
router.post("/likeComment", reaction.likeComment);
router.post("/dislikePost", reaction.dislikePost);
router.post("/dislikeComment", reaction.dislikeComment);
router.post("/likeDetect", reaction.detectLikePost);

module.exports = router;
