const { Post, Like } = require("../db.js");
const { Comment, Followed} = require("../db");
const { User } = require("../db");
const jwt = require("jsonwebtoken");
const sequelize = require("sequelize");
class PostClass {
  constructor() {}

  getAllPosts = async (req, res) => { //EN PROCESO. NO TOCAR
    try {
      const {token} = req.body; 
      const tokenDecode = jwt.decode(token);
      let userFound;
      try{
        userFound = await User.findOne({where: {userName: tokenDecode.userName}});
      }catch{return res.status(200).json({msgE: "User not found"})}
      const followedsFound = Followed.findAll({
        where: {UserIdUser: userFound.dataValues.idUser},
        include: {
          model: Post
        }
      });
      if(!followedsFound.length){return res.status(200).json({msg: "The user has no following"})};
      console.log(followedsFound);
      const posts = await Post.findAll({
        atributes: [
          "idPost",
          "datePost",
          "contentPost",
          "linkContent",
          "nameStatusPost",
          "imagePost",
          "UserIdUser",
        ],
        include: [
          {
            model: User,
            attributes: ["userName"],
          },
          {
            model: Like,
            attributes: ["userName"],
          },
          {
            model: Comment,
            attributes: ["userNameComment"],
          },
        ],
      });
      const reverse = posts.reverse();
      return res.status(200).json(reverse);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: error.message });
    }
  };

  getPost = async (req, res) => {
    const { idPost } = req.params;
    try {
      const post = await Post.findOne({
        where: { idPost },
        include: [
          {
            model: User,
            attributes: ["userName"],
          },
          {
            model: Like,
            attributes: ["userName"],
          },
        ],
      });
      if (!post)
        return res
          .status(404)
          .json({ msgE: "The post with that id doest not exist" });

      res.status(200).json(post);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };

  createPost = async (req, res) => {
    const { contentPost, linkContent, imagePost, token, postIsPremium } = req.body;
    const tokenDecode = jwt.decode(token);

    try {
      const user = await User.findOne({
        where: { userName: tokenDecode.userName },
      });
      if (!user)
        return res.status(404).json({ msgE: "Could not find your user" });
        if(postIsPremium === true) {
          console.log("entra al if")
          const newPost = await Post.create({
            contentPost,
            linkContent,
            imagePost,
            typeOfPost: "Premium"
          });
          await newPost.setUser(user.idUser);
    
          return res.status(201).json({
            msg: "Post created successfully",
            newPost,
            userName: user.userName,
          });
        }
      const newPost = await Post.create({
        contentPost,
        linkContent,
        imagePost,
      });
      await newPost.setUser(user.idUser);

      return res.status(201).json({
        msg: "Post created successfully",
        newPost,
        userName: user.userName,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  updatePost = async (req, res) => {
    const { idPost } = req.params;
    const id = req.body.idPost;
    const { datePost, nameStatusPost, createdAt, updatedAt, UserIdUser } =
      req.body;
    try {
      if (
        id ||
        datePost ||
        nameStatusPost ||
        createdAt ||
        updatedAt ||
        UserIdUser
      )
        return res
          .status(500)
          .json({ error: "You cannot change this properties" });
      const post = await Post.findByPk(idPost);
      if (!post)
        return res
          .status(404)
          .json({ msgE: "The post with that id doest not exist" });

      post.set(req.body);
      await post.save();
      return res.status(200).json(post);
    } catch (error) {
      return res.status(500).json({ msgE: error.message });
    }
  };

changeTypeOfPost = async (req, res) => {
  const { idPost, changeTo } = req.body;
  try {
    const post = await Post.findOne({ where: { idPost } })
    if(!post) return res.status(404).json({ msgE: "The post with that id doest not exist" });
    if(changeTo === "Premium") {
      if(post.dataValues.typeOfPost === "Premium") return res.status(400).json({ msgE: "The post was already Premium" });
      await post.update({typeOfPost: "Premium"});
      res.sendStatus(200).json({msgE: "Post changed to premium"});
    }
    if(changeTo === "Standard") {
      if(post.dataValues.typeOfPost === "Standard") return res.status(400).json({ msgE: "The post was already Standard" });
      await post.update({typeOfPost: "Standard"});
      res.sendStatus(200).json({msgE: "Post changed to standard"});
    }
  } catch (error) {
    console.log(error);
  }
}

  deletePost = async (req, res) => {
    const { idPost } = req.params;
    try {
      const post = await Post.findByPk(idPost);
      if (!post)
        return res
          .status(404)
          .json
      await post.destroy();

      return res.status(200).json({ msg: "Post deleted succesfully" });
    } catch (error) {
      return res.status(500).json({ msgE: error.message });
    }
  };

  getAllComments = async (req, res) => {
    const { idPost } = req.params;

    try {
      const comments = await Comment.findAll({
        attributes: [
          "idComment",
          "dateComment",
          "commentContent",
          "userNameComment",
        ],
        where: { PostIdPost: idPost },
      });
      res.json(comments);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };
}

module.exports = PostClass;
