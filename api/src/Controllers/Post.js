const { Post, Like } = require("../db.js");
const { Comment, Followed } = require("../db");
const { User } = require("../db");
const jwt = require("jsonwebtoken");
const sequelize = require("sequelize");
class PostClass {
  constructor() {}

  
  async aux(user) {
    let userPosts = await User.findOne({
      where: { userName: user },
      include: [
        {
          model: Post,
          attributes: [
            "idPost",
            "datePost",
            "contentPost",
            "linkContent",
            "nameStatusPost",
            "typeOfPost",
            "isAdmin",
            "UserIdUser",
            "imagePost",
            "createdAt",
          ],
          include: [
            {
              model: Comment,
            },
            { model: Like, attributes: ["userName"] },
          ],
        },
      ],
    });
    return {
      idUser: userPosts.dataValues.idUser,
      userName: userPosts.dataValues.userName,
      // profileImage: userPosts.dataValues.profileImage,
      posts: userPosts.dataValues.Posts,
    };
  }
  getAllPosts = async (req, res) => {
    try {
      const { token } = req.query;
      const tokenDecode = jwt.decode(token);
      let userFound;
      try {
        userFound = await User.findOne({
          where: { userName: tokenDecode.userName },
        });
      } catch {
        return res.status(200).json({ msgE: "User not found" });
      }
      const followedsFound = await Followed.findAll({
        where: { UserIdUser: userFound.dataValues.idUser },
        attributes: ["userProfileFollowed", "userNameFollowed"],
      });
      let users = [];
      for (
        let userFollowed = 0;
        userFollowed < followedsFound.length;
        userFollowed++
      ) {
        users.push(followedsFound[userFollowed].dataValues.userNameFollowed);
      }
      let usersPost = await Promise.all(users.map((user) => this.aux(user)));
      let posts_aux1 = [];
      let posts_disorderly = [];
      let posts_orderly = [];
      for (let userPost in usersPost) {
        posts_aux1.push(usersPost[userPost]);
      }
      for (const i in posts_aux1) {
        for (let postn in posts_aux1[i].posts) {
          posts_aux1[i].posts[postn].dataValues["idUser"] =
            posts_aux1[i].idUser;
          posts_aux1[i].posts[postn].dataValues["nameUser"] =
            posts_aux1[i].userName;
          posts_disorderly.push(posts_aux1[i].posts[postn].dataValues);
        }
      }
      posts_orderly = posts_disorderly.sort((dateA, dateB) => {
        if (dateA.createdAt < dateB.createdAt) {
          return 1;
        }
        if (dateA.createdAt > dateB.createdAt) {
          return -1;
        }
        return 0;
      });
      if (posts_orderly.length) {
        res.status(200).json(posts_orderly);
      } else {
        res.status(200).json({ msg: "There are no posts to show" });
      }
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
    const { contentPost, linkContent, imagePost, token, postIsPremium } =
      req.body;
    const tokenDecode = jwt.decode(token);

    try {
      const user = await User.findOne({
        where: { userName: tokenDecode.userName },
      });
      if (!user)
        return res.status(404).json({ msgE: "Could not find your user" });
      if (postIsPremium === true) {
        console.log("entra al if");
        const newPost = await Post.create({
          contentPost,
          linkContent,
          imagePost,
          typeOfPost: "Premium",
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
    const { contentPost, idPost, linkContent, typeOfPost } = await req.body;
    try {
      const post = await Post.findByPk(idPost);
      if (!post)
        return res
          .status(404)
          .json({ msgE: "The post with that id doest not exist" });
      var postUpdate = await Post.update(
        { contentPost, linkContent, typeOfPost },
        { where: { idPost } }
      );
      return res.status(200).json(postUpdate);
    } catch (error) {
      return res.status(500).json({ msgE: error.message });
    }
  };

  changeTypeOfPost = async (req, res) => {
    const { idPost, changeTo } = req.body;
    try {
      const post = await Post.findOne({ where: { idPost } });
      if (!post)
        return res
          .status(404)
          .json({ msgE: "The post with that id doest not exist" });
      if (changeTo === "Premium") {
        if (post.dataValues.typeOfPost === "Premium")
          return res.status(400).json({ msgE: "The post was already Premium" });
        await post.update({ typeOfPost: "Premium" });
        res.sendStatus(200).json({ msgE: "Post changed to premium" });
      }
      if (changeTo === "Standard") {
        if (post.dataValues.typeOfPost === "Standard")
          return res
            .status(400)
            .json({ msgE: "The post was already Standard" });
        await post.update({ typeOfPost: "Standard" });
        res.sendStatus(200).json({ msgE: "Post changed to standard" });
      }
    } catch (error) {
      console.log(error);
    }
  };

  deletePost = async (req, res) => {
    const { idPost } = req.params;
    try {
      const post = await Post.findByPk(idPost);
      if (!post) return res.status(404).json;
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
