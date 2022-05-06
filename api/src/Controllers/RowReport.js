const { RowReport } = require('../db.js');
const { Post } = require('../db');
const { Comment } = require('../db');

class ReportClass {
    constructor(){}

    reportComment = async(req,res) => {
        const { idComment, idUserReporter, causeReport } = req.body //id del comentario, del user que reporta y la causa

        try {
            const findComment = await Comment.findOne({ where:{idComment: idComment}})
            const findReportComment = await RowReport.findOne({
                where: {
                    idUserReporter: idUserReporter
                }
            })
            if(findReportComment) return res.status(403).json({ msgE: "You already reported this comment" })

            if(findComment.idUserComment === idUserReporter) return res.status(400).json({ msgE: "You want to report your comment? 😶" })

            const createReport = await RowReport.create({idPostCommentUser: idComment, idUserReporter: idUserReporter, causeReport: causeReport})
            return res.status(201).json({ msg: "Thank you, the report has been sended"})
        } catch (error) {
            console.log(error)
        }
    }

    reportPost = async(req,res) => {
        const { idPost, idUserReporter, causeReport } = req.body

        try {
            const findPost = await Post.findOne({where:{idPost:idPost}})
            // console.log(findPost)
            const findReportPost = await RowReport.findOne({where : {idPostCommentUser: idPost, idUserReporter: idUserReporter, causeReport: causeReport} })
            if(findReportPost) return res.status(403).json({ msgE: "You already reported this post" })

            if(findPost.UserIdUser === idUserReporter) return res.status(400).json({ msgE: "You wanna report your own post? 😳" })

            const createReportPost = await RowReport.create({idPostCommentUser: idPost, idUserReporter: idUserReporter, causeReport: causeReport})
            return res.status(201).json({ msg: "Thank you, the report has been sended"})
        } catch (error) {
            console.log(error)
        }
    }

    reportUser = async(req,res) => {
        const { idUser, idUserReporter, causeReport } = req.body

        try {
            const findReportUser = await RowReport.findOne({where : {idPostCommentUser: idUser, idUserReporter: idUserReporter, causeReport: causeReport} })
            if(findReportUser) return res.status(403).json({ msgE: "You already reported this user" })

            if(idUserReporter === idUser) return res.status(400).json({ msgE: "Do you wanna report yourself? 😨" })

            const createReportUser = await RowReport.create({idPostCommentUser: idUser, idUserReporter: idUserReporter, causeReport: causeReport})
            return res.status(201).json({ msg: "Thank you, the report has been sended"})
        } catch (error) {
            console.log(error)
        }
    }

}

module.exports = ReportClass;