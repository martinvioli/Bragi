const { Router } = require('express');
const Post = require('../Controllers/Post')
const CommentClass = require('../Controllers/Comment');
const { verifyToken } = require('../middlewares/authjwt')


const router = Router();
const post = new Post();
const postComment = new CommentClass();

router.get('/', [verifyToken], post.getAllPosts);
router.post('/', [verifyToken], post.createPost);
router.get('/:idPost', [verifyToken], post.getPost);
router.put('/:idPost', [verifyToken], post.updatePost);
router.delete('/:idPost', [verifyToken], post.deletePost);

router.post('/comment', [verifyToken], postComment.postComment);
router.put('/comment/edit/:idComment', [verifyToken], postComment.editComment);
router.delete('/comment/:idComment', [verifyToken], postComment.deleteComment);
router.get('/comments/:idPost', [verifyToken], post.getAllComments)


module.exports = router;