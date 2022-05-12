const {User, Post, Comment, ReportPostCommentUser, RowReport} = require('../db.js');
const jwt = require('jsonwebtoken');
class ReportPCUClass {
    constructor(){}

    reportComment = async (req,res) => {
        const {token, idComment, causeReport} = req.body;
        const tokenDecoded = jwt.decode(token);
        try {
            //Searches and validations
            const userFound = await User.findOne({where: {userName: tokenDecoded.userName}});
            if(!userFound) return res.status(404).json({msgE: "User not found"});
            const commentFound = await User.findOne({where: {idComment}});
            if(!commentFound) return res.status(404).json({msgE: "Comment not found"});

            //Create comment report
            const [createdReport, existReport]= await ReportPostCommentUser.findOrCreate(
                {
                    where:{idComment},
                    defaults: {typeReport: 'Comment', idComment} //Vinculación de la creación del reporte y el commentario.}
                }
            )
            if(existReport){
                const existRowReport = await RowReport.findOne(
                    {where: {
                        [Op.and]:[{idUserReporter: token.dataValues.idUser}, {idPostCommentUser: idComment}]
                    }}
                );
                if(existRowReport) return res.status(400).json({msgE: "You already reported this comment"});
            }
            if(commentFound.dataValues.idUserComment === idComment) return res.status(400).json({ msgE: "You want to report your comment? 😶" })
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
            const postFound = await User.findOne({where: {idPost}});
            if(!postFound) return res.status(404).json({msgE: "Post not found"});

            //Create post report
            const [createdReport, existReport]= await ReportPostCommentUser.findOrCreate(
                {
                    where:{idPost},
                    defaults: {typeReport: 'Post', idPost} //Vinculación de la creación del reporte y el posteo.}
                }
            )
            if(existReport){
                const existRowReport = await RowReport.findOne(
                    {where: {
                        [Op.and]:[{idUserReporter: token.dataValues.idUser}, {idPostCommentUser: idPost}]
                    }}
                );
                if(existRowReport) return res.status(400).json({msgE: "You already reported this post"});
            }
            if(postFound.dataValues.UserIdUser === userFound.dataValues.idUser) return res.status(400).json({ msgE: "You wanna report your own post? 😳" })
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

            //Create user report
            const [createdReport, existReport]= await ReportPostCommentUser.findOrCreate(
                {
                    where:{idUser},
                    defaults: {typeReport: 'User', idUser} //Vinculación de la creación del reporte y el user.}
                }
            )
            if(existReport){
                const existRowReport = await RowReport.findOne(
                    {where: {
                        [Op.and]:[{idUserReporter: token.dataValues.idUser}, {idPostCommentUser: idUser}]
                    }}
                );
                if(existRowReport) return res.status(400).json({msgE: "You already reported this user"});
            }
            if(userFound.dataValues.idUse === idUser) return res.status(400).json({ msgE: "Do you wanna report yourself? 😨" })
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