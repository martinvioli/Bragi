const {Router} = require('express');
const Reaction = require('../Controllers/ReactionPostComment');
const { verifyToken } = require('../middlewares/authjwt')

const router = Router();
const reaction = new Reaction();

router.post('/likePost', [verifyToken],  reaction.likePost);
router.post('/likeComment', [verifyToken],  reaction.likeComment);
router.post('/dislikePost', [verifyToken],  reaction.dislikePost);
router.post('/dislikeComment', [verifyToken],  reaction.dislikeComment);

module.exports = router;