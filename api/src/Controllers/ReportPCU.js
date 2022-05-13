const {User, Post, Comment, ReportPostCommentUser, RowReport} = require('../db.js');
const jwt = require('jsonwebtoken');
const {Op} = require('sequelize')
class ReportPCUClass {
    constructor(){}

    reportComment = async (req,res) => {
        const {token, idComment, causeReport} = req.body;
        const tokenDecoded = jwt.decode(token);
        try {
            //Searches and validations
            const userFound = await User.findOne({where: {userName: tokenDecoded.userName}});
            if(!userFound) return res.status(404).json({msgE: "User not found"});
            const commentFound = await Comment.findOne({where: {idComment}});
            if(!commentFound) return res.status(404).json({msgE: "Comment not found"});
            if(commentFound.dataValues.idUserComment === userFound.dataValues.idUser) return res.status(400).json({ msgE: "You want to report your comment? 😶" })

            //Create comment report
            const [createdReport, existReport]= await ReportPostCommentUser.findOrCreate(
                {
                    where:{CommentIdComment: idComment},
                    defaults: {typeReport: 'comment', CommentIdComment: idComment} //Vinculación de la creación del reporte y el commentario.}
                }
            )
            if(!existReport){ //Entra por falso, o sea, no lo creo, ya existía.
                const existRowReport = await RowReport.findOne(
                    {where: {
                        [Op.and]:[{idUserReporter: userFound.dataValues.idUser}, {idPostCommentUser: idComment}]
                    }}
                );
                if(existRowReport) return res.status(400).json({msgE: "You already reported this comment"});
            }
            const createRowReport = await RowReport.create({
                idUserReporter: userFound.dataValues.idUser,
                idPostCommentUser: commentFound.dataValues.idComment,
                causeReport: causeReport
            })
            await createdReport.addRowReport(createRowReport); //Vinculo el reporte con la creación con el reporte del usuario.
            return res.status(201).json({ msg: "Thank you, the report has been sended"})
        } catch (error) {
            console.log(error)
            return res.status(500).json({msgE: "Failed to create comment report"})
        }
    }
    reportPost = async (req,res) => {
        const {token, idPost, causeReport} = req.body;
        const tokenDecoded = jwt.decode(token);
        try {
            //Searches and validations
            const userFound = await User.findOne({where: {userName: tokenDecoded.userName}});
            if(!userFound) return res.status(404).json({msgE: "User not found"});
            const postFound = await Post.findOne({where: {idPost}});
            if(!postFound) return res.status(404).json({msgE: "Post not found"});
            if(postFound.dataValues.UserIdUser === userFound.dataValues.idUser) return res.status(400).json({ msgE: "You wanna report your own post? 😳" })

            //Create post report
            const [createdReport, existReport]= await ReportPostCommentUser.findOrCreate(
                {
                    where:{PostIdPost: idPost},
                    defaults: {typeReport: 'post', PostIdPost: idPost} //Vinculación de la creación del reporte y el posteo.}
                }
            )
            if(!existReport){ //Entra por falso, o sea, no lo creo, ya existía.
                const existRowReport = await RowReport.findOne(
                    {where: {
                        [Op.and]:[{idUserReporter: userFound.dataValues.idUser}, {idPostCommentUser: idPost}]
                    }}
                );
                if(existRowReport) return res.status(400).json({msgE: "You already reported this post"});
            }
            const createRowReport = await RowReport.create({
                idUserReporter: userFound.dataValues.idUser,
                idPostCommentUser: postFound.dataValues.idPost,
                causeReport: causeReport
            })
            await createdReport.addRowReport(createRowReport); //Vinculo el reporte con la creación con el reporte del usuario.
            return res.status(201).json({ msg: "Thank you, the report has been sended"})
        } catch (error) {
            console.log(error)
            return res.status(500).json({msgE: "Failed to create post report"})
        }
    }
    reportUser = async (req,res) => {
        const {token, idUser, causeReport} = req.body;
        const tokenDecoded = jwt.decode(token);
        try {
            //Searches and validations
            const userFound = await User.findOne({where: {userName: tokenDecoded.userName}});
            if(!userFound) return res.status(404).json({msgE: "User not found"});
            const userReportedFound = await User.findOne({where: {idUser}});
            if(!userReportedFound) return res.status(404).json({msgE: "User reported not found"});
            if(userFound.dataValues.idUser === idUser) return res.status(400).json({ msgE: "Do you wanna report yourself? 😨" })
            
            //Create user report
            const [createdReport, existReport]= await ReportPostCommentUser.findOrCreate(
                {
                    where:{UserIdUser: idUser},
                    defaults: {typeReport: 'user', UserIdUser: idUser} //Vinculación de la creación del reporte y el user.}
                }
            )
           
            if(!existReport){ //Entra por falso, o sea, no lo creo, ya existía.
                const existRowReport = await RowReport.findOne(
                    {where: {
                        [Op.and]:[{idUserReporter: userFound.dataValues.idUser}, {idPostCommentUser: idUser}]
                    }}
                );
                if(existRowReport) return res.status(400).json({msgE: "You already reported this user"});
            }
            const createRowReport = await RowReport.create({
                idUserReporter: userFound.dataValues.idUser,
                idPostCommentUser: userReportedFound.dataValues.idUser,
                causeReport: causeReport
            })
            await createdReport.addRowReport(createRowReport); //Vinculo el reporte con la creación con el reporte del usuario.
            return res.status(201).json({ msg: "Thank you, the report has been sended"})
        } catch (error) {
            console.log(error)
            return res.status(500).json({msgE: "Failed to create user report"})
        }
    }
}

module.exports = ReportPCUClass;