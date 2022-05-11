const {User, Post, Like} = require('../db.js')
const jwt = require("jsonwebtoken");
const authConfig = require('../config/auth');
const {Op} = require('sequelize')
class ReactionPostComment{
    constructor(){}

    likePost = async (req, res) => {
        const {token, idPost} = req.body;
        try{
            //Pre-validation
            if(!token){return res.status(400).json({msgE: "Token doesn't exist"})};
            if(!idPost){return res.status(400).json({msgE: "Post doesn't exist"})};
            //Search Data
            const tokenDecode = jwt.decode(token, authConfig.secret);
            const userLikePost = await User.findOne({where: {userName: tokenDecode.userName}});
            const postFound = await Post.findOne({where: {idPost}});
            //Validation post-Search
            if(!userLikePost){return res.status(400).json({msgE: "User not found"})};
            if(!postFound){return res.status(400).json({msgE: "Post not found"})};
            //Create like
            try{
                //Valid if there is already a like
                const likedUser = await Like.findOne({where: {
                    [Op.and]: [
                        {idUserLikePost: userLikePost.dataValues.idUser},
                        {PostIdPost: postFound.dataValues.idPost}
                    ]
                }})
                if(likedUser){return res.status(400).json({msgE: "The post already has a like"})}
                //Create of object like
                const likeCreated = await Like.create(
                    {
                        idUserLikePost: userLikePost.dataValues.idUser,
                        userName: userLikePost.dataValues.userName 
                    }
                );
                await postFound.addLike(likeCreated)
                return res.status(200).json({msg: "Like created"});
            }catch{
                return res.status(404).json({msgE: "Linked like with post error"});
            }
        }catch(e){
            return res.status(400).json({msgE: "Post reaction error"});
        }
    }
    
    dislikePost = async (req, res) => {
        const {token, idPost} = req.body;
        try{
            //Pre-validation
            if(!token){return res.status(400).json({msgE: "Token doesn't exist"})};
            if(!idPost){return res.status(400).json({msgE: "Post doesn't exist"})};
            //Search Data
            const tokenDecode = jwt.decode(token, authConfig.secret);
            const userLikePost = await User.findOne({where: {userName: tokenDecode.userName}});
            const postFound = await Post.findOne({where: {idPost}});
            //Validation post-Search
            if(!userLikePost){return res.status(400).json({msgE: "User not found"})};
            if(!postFound){return res.status(400).json({msgE: "Post not found"})};
            //Delete Like of post
            try{
                const notExisteLike = await Like.findOne({where: {
                    [Op.and]: [
                        {idUserLikePost: userLikePost.dataValues.idUser},
                        {PostIdPost: postFound.dataValues.idPost}
                    ]
                }})
                if(!notExisteLike) return res.status(400).json({msgE: "Not exist like in the post"})
                await Like.destroy({
                    where: {
                        [Op.and]: [
                            {idUserLikePost: userLikePost.dataValues.idUser},
                            {PostIdPost: postFound.dataValues.idPost}
                        ]
                    }
                })
                return res.status(200).json({msg: "Like removed"});    
            }catch{
                return res.status(404).json({msgE: "Like not found"});
            }
        }catch(e){
            return res.status(400).json({msgE: "Could not get the like of the post"});
        }
    }
    //ADICIONAL PONER COMENTARIOS
    getLikesPost = async (req, res) => { //Solamente número
    
    }
    likeComment = async (req, res) => {
        const {token, idPost, idComment} = req.body;
        
    }
    dislikeComment = async (req, res) => {

    }
    getLikesComment = async (req, res) => { //Solamente número

    }

}

module.exports = ReactionPostComment;