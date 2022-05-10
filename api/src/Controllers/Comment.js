const { Comment } = require("../db");
const { User } = require('../db')
const { Post } = require('../db')
const jwt = require('jsonwebtoken');


class CommentClass {
    constructor() {}

    postComment = async(req,res) => {
        const { commentContent, token, idPost } = req.body;
        const tokenDecode = jwt.decode(token)

        try {
            if(!idPost) return res.status(400).json({ msgE:"The post was not found" })

            const user = await User.findOne({
                where: {
                    userName: tokenDecode.userName
                }
            })
            if(!user) return res.status(404).json({ msgE: 'Could not find your user' })

            if(user.nameTypeUser !== "Premium") return res.status(400).json({ msgE:"Only premium users can comment posts" })

            if(commentContent.length > 255) return res.status(403).json({ msgE: "This content is too long" })

            const createComment = await Comment.create({ commentContent: commentContent, idUserComment: user.idUser, userNameComment: user.userName })
            if(!createComment) return res.status(400).json({ msgE: "There was an error creating the comment" })

            const commented = await createComment.setPost(idPost)
            if(commented) return res.status(201).json({ msg: "Comment posted successfully" })
            return res.status(418).json({ msgE: "There was an error trying to post the comment"})
        } catch (error) {
            console.log(error)
            return res.status(400).json({ msgE: "There was an error on the request"})
        }
    }

    editComment = async(req,res) => {
        const { editContent } = req.body;
        const { idComment } = req.params

        try {
            const commentToEdit = Comment.findByPk(idComment)
            if(!commentToEdit) return res.status(404).json({ msgE: "Comment not found" })

            if(commentContent.length > 255) return res.status(403).json({ msgE: "This content is too long" })

            await Comment.update({ commentContent: editContent }, { where: { idComment: idComment } })
            return res.status(200).json({ msg: "Post edited successfully" })

        } catch (error) {
            console.log(error)
        }
    }

    deleteComment = async(req,res) => {
        const { idComment } = req.params
        try {
            const comment = await Comment.findByPk(idComment);
            if (!comment) return res.status(404).json({msgE: 'The comment with that id doest not exist'});
            await comment.destroy();

            return res.status(200).json({msg: 'Comment deleted succesfully'});
        } catch (error) {
        return res.status(500).json({ msgE: error.message });
        }
    }
}

module.exports = CommentClass