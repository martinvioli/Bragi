const { Router } = require("express");
const Post = require("../Controllers/Post");
const CommentClass = require("../Controllers/Comment");
const { verifyToken } = require("../middlewares/authjwt");
const User = require("../Controllers/User");

const router = Router();
const post = new Post();
const postComment = new CommentClass();
const user = new User();

router.get("/", post.getAllPosts);
router.post("/", post.createPost);
router.post("/changePostType", post.changeTypeOfPost)
router.get("/:idPost", post.getPost);
router.put("/:idPost", post.updatePost);
router.delete("/:idPost", post.deletePost);

router.post("/comment", postComment.postComment);
router.put("/comment/edit/:idComment", postComment.editComment);
router.delete("/comment/:idComment", postComment.deleteComment);
router.get("/comments/:idPost", post.getAllComments);

router.get("/:userName/posts", user.getUserPosts);

module.exports = router;
