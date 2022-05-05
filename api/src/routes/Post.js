const { Router } = require('express');
const Post = require('../Controllers/Post')
const CommentClass = require('../Controllers/Comment');

const router = Router();
const post = new Post();
const postComment = new CommentClass();

router.get('/', post.getAllPosts);
router.post('/', post.createPost);
router.get('/:idPost', post.getPost);
router.put('/:idPost', post.updatePost);
router.delete('/:idPost', post.deletePost);

router.post('/comment', postComment.postComment);
router.put('/comment/edit/:idComment', postComment.editComment);
router.delete('/comment/:idComment', postComment.deleteComment);
router.get('/comments/:idPost', post.getAllComments)


module.exports = router;