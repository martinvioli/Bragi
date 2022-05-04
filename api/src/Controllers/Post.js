const { Post } = require('../db.js');
const { Comment } = require("../db");
const { User } = require('../db');
const jwt = require('jsonwebtoken');

class PostClass {
    constructor(){}

    getAllPosts = async (req, res) => {
        try {
            const posts = await Post.findAll({
                atributes: [
                    'idPost',
                    'datePost',
                    'contentPost',
                    'linkContent',
                    'nameStatusPost',
                    'imagePost',
                    'UserIdUser'
                ]
            });
            return res.status(200).json(posts)
        } catch (error) {
            return res.status(500).json({ message: error.message })
        }
    }

    getPost = async (req, res) => {
        const { idPost } = req.params;
        try {
            const post = await Post.findByPk(idPost);
            if (!post) return res.status(404).json({msgE: 'The post with that id doest not exist'});

            res.status(200).json(post)
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    createPost = async (req, res) => {
        const { contentPost, linkContent, imagePost, token } = req.body;
        const tokenDecode = jwt.decode(token)

        try {
            const user = await User.findOne({ where: { userName: tokenDecode.userName } })
            if(!user) return res.status(404).json({ msgE: 'Could not find your user' })

            const newPost = await Post.create({ contentPost, linkContent, imagePost });
            await newPost.setUser(user.idUser)

            return res.status(201).json({ msg: "Post created successfully", newPost})
        } catch (error) {
            res.status(500).json({message: error.message})
        }
    };

    updatePost = async (req, res) => {
        const { idPost } = req.params;
        const id = req.body.idPost;
        const {datePost, nameStatusPost, createdAt, updatedAt, UserIdUser} = req.body;
        try {
            if(id || datePost || nameStatusPost || createdAt || updatedAt || UserIdUser) return res.status(500).json({error: 'You cannot change this properties'});
            const post = await Post.findByPk(idPost);
            if (!post) return res.status(404).json({msgE: 'The post with that id doest not exist'});

            post.set(req.body);
            await post.save();
            return res.status(200).json(post);
        } catch (error) {
            return res.status(500).json({ msgE: error.message });
        }
    }

    deletePost = async(req, res) => {
        const { idPost } = req.params;
        try {
            const post = await Post.findByPk(idPost);
            if (!post) return res.status(404).json({msgE: 'The post with that id doest not exist'});
            await post.destroy();

            return res.status(200).json({msg: 'Post deleted succesfully'});
        } catch (error) {
        return res.status(500).json({ msgE: error.message });
        }
    };

    getAllComments = async(req,res) => {
        const { idPost } = req.params;

        try {
            const comments = await Comment.findAll({
                attributes: ["idComment", "dateComment", "commentContent", "userNameComment"],
                where: { PostIdPost: idPost },
            });
            res.json(comments);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

};

module.exports = PostClass;
