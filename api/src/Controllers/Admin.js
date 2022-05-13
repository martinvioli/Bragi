const {User, ReportPostCommentUser, RowReport} = require('../db.js');
const {Op} = require('sequelize');
class Admin{
    constructor(){};

    //Estadísticas de cada perfil
        getUserStandar = async (req, res) => {
            try{
            const userStandars = await User.findAll({
                where: {nameTypeUser: 'Standard'},
                attributes: ['idUser', 'email', 'userName', 'nameStateUser']
            });
            if(!userStandars) return res.status(404).json({msgE: "There aren't standar users"});
            res.status(200).json(userStandars);
            }catch(e){console.log(e)}
        }
        getUserPremium = async (req, res) => {
            const userPremium = await User.findAll({
                where: {nameTypeUser: 'Premium'},
                attributes: ['idUser', 'email', 'userName', 'nameStateUser']
            });
            if(!userPremium) return res.status(404).json({msgE: "There aren't Premium users"});
            res.status(200).json(userPremium);
        }
        getUserArtist = async (req, res) => {
            const userArtist = await User.findAll({
                where: {nameTypeUser: 'Artist'},
                attributes: ['idUser', 'email', 'userName', 'nameStateUser']
            });
            if(!userArtist) return res.status(404).json({msgE: "There aren't Artist users"});
            res.status(200).json(userArtist);
        }

    //Reportes
        allReport = async (req, res) => {
            try{
                const reports = await ReportPostCommentUser.findAll({
                    attributes: ['idReport','UserIdUser','createdAt'],
                    include: {
                        model: RowReport,
                        attributes: ['causeReport']
                    }
                });
                return res.status(200).json(reports);
            }catch{
                return res.status(200).json({msgE: "There aren't reports"})
            }
        }
        getUserReport = async (req, res) => {
            try{
                const usersReport = await ReportPostCommentUser.findAll({
                    where: {UserIdUser: {[Op.not]: null}},
                    attributes: ['idReport','UserIdUser','createdAt'],
                    include: {
                        model: RowReport,
                        attributes: ['causeReport']
                    }
                });
                return res.status(200).json(usersReport);
            }catch(e){
                console.log(e);
                return res.status(200).json({msgE: "There aren't reports"})
            }
        }
        getPostReport = async (req, res) => {
            try{
                const postsReport = await ReportPostCommentUser.findAll({
                    where: {PostIdPost: {[Op.not]: null}},
                    attributes: ['idReport','PostIdPost','createdAt'],
                    include: {
                        model: RowReport,
                        attributes: ['causeReport']
                    }
                });
                return res.status(200).json(postsReport);
            }catch(e){
                console.log(e);
                return res.status(200).json({msgE: "There aren't reports"})
            }
        }
        getCommentReport = async (req, res) => {
            try{
                const commentsReport = await ReportPostCommentUser.findAll({
                    where: {CommentIdComment: {[Op.not]: null}},
                    attributes: ['idReport','CommentIdComment','createdAt'],
                    include: {
                        model: RowReport,
                        attributes: ['causeReport']
                    }
                });
                return res.status(200).json(commentsReport);
            }catch(e){
                console.log(e);
                return res.status(200).json({msgE: "There aren't reports"})
            }
        }
        getReport = async (req, res) => {
            try{
                const {idReport} = req.params;
                const report = await ReportPostCommentUser.findOne({
                    where: {idReport},
                    include: {
                        model: RowReport
                    }
                });
                return res.status(200).json(report);
            }catch{
                res.status(200).json({msgE: "Report not found"})
            }
        }

    //Banneo de usuarios
        baneoUser = async (req, res) => {
            
        }
        disbaneoUser = async (req, res) => {

        }

}

module.exports = Admin;