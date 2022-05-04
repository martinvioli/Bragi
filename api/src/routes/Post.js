const { Router } = require('express');
const Post = require('../Controllers/Post')

const router = Router();
const post = new Post();

router.get('/', post.getAllPosts);
router.get('/:idPost', post.getPost);
router.post('/', post.createPost);
router.put('/:idPost', post.updatePost);
router.delete('/:idPost', post.deletePost);


module.exports = router;