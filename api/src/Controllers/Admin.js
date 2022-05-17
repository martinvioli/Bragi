const {User, Post, Comment, ReportPostCommentUser, RowReport, PlanPremium} = require('../db.js');
const {Op} = require('sequelize');
const validation = require('../Validations/auths');
const jwt = require("jsonwebtoken");
class Admin{
    constructor(){};

    //Estadísticas de cada perfil.
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
        getPremiumActiveAccounts = async (req, res) => {
            try {
                const accounts = await MembershipUser.findAll({where: {statePlan: 'Active'},
                    include: {
                        model: PlanPremium, attributes: ["namePlanPremium", "priceMembership"]
                    } 
                });
                if(accounts.length){
                    res.status(200).json(accounts);
                }else{
                    res.status(200).json({msg: "There are no users with Active premium plans"});
                }
            } catch (error) {
                return res.status(404).json(error.message)
            }
        }
        getPremiumInactiveAccounts = async (req, res) => {
            try {
                const accounts = await MembershipUser.findAll({where: {statePlan: 'Inactive'},
                    include: {
                        model: PlanPremium, attributes: ["namePlanPremium", "priceMembership"]
                    }
                });
                if(accounts.length){
                    res.status(200).json(accounts);
                }else{
                    res.status(200).json({msg: "There are no users with inactive premium plans"});
                }
            } catch (error) {
                return res.status(404).json(error.message)
            }
        }
        getPremiumDebtorAccounts = async (req, res) => {
            try {
                const accounts = await MembershipUser.findAll({where: {statePlan: 'Debtor'},
                    include: {
                        model: PlanPremium, attributes: ["namePlanPremium", "priceMembership"]
                    } 
                });
                if(accounts.length){
                    res.status(200).json(accounts);
                }else{
                    res.status(200).json({msg: "There are no users with Debtor premium plans"});
                }
            } catch (error) {
                return res.status(404).json(error.message)
            }
        }
        getAllPosts = async (req, res) => {
            try{
                const allPostAdmin = await Post.findAll({where: {isAdmin: false}});
                return res.status(200).json(allPostAdmin);
                //PROBAR
            }catch(e){
                return res.status(404).json({msgE: "There aren't post"});
            } 
        }
    //Posteos para premium hechos por el administrador
        getPostsAdmin = async (req, res) => {
            try{
                const allPostAdmin = await Post.findAll({where: {isAdmin: true}});
                return res.status(200).json(allPostAdmin);
            }catch(e){
                return res.status(404).json({msgE: "There aren't admin post"});
            }
        }
        createPostAdmin = async (req, res) => {
            const { contentPost, linkContent, imagePost, token } = req.body;
            try {
                let tokenDecode;
                try{
                    tokenDecode = jwt.decode(token);
                }catch{
                    return res.status(404).json({ msgE: "Could not find your user" })
                };
                const user = await User.findOne({
                    where: { userName: tokenDecode.userName },
                });
                if(!user) return res.status(404).json({ msgE: "Could not find your user" });
                if(user.dataValues.nameTypeUser !== 'Admin') return res.status(404).json({ msgE: "You are not admin" });
                const newPost = await Post.create({
                    contentPost,
                    linkContent,
                    imagePost,
                    isAdmin: true
                });
                await newPost.setUser(user.idUser);
                return res.status(201).json({
                    msg: "Admin post created successfully",
                    newPost,
                    userName: user.userName,
                });
            } catch (error) {
            res.status(500).json({ message: error.message });
            }
        };
        updatePostAdmin = async (req, res) => {
            const {idPost, token, contentPost, linkContent, imagePost} = req.body;
            try {
                let tokenDecode;
                try{
                    tokenDecode = jwt.decode(token);
                }catch{
                    return res.status(404).json({ msgE: "Could not find your user" })
                };
                const user = await User.findOne({
                    where: { userName: tokenDecode.userName },
                });
                if(!user) return res.status(404).json({ msgE: "Could not find your user" });
                if(user.dataValues.nameTypeUser !== 'Admin') return res.status(404).json({ msgE: "You are not admin" });
                let postFound;
                try{
                    postFound = await Post.findByPk(idPost);
                }catch{
                    return res.status(404).json({msgE: "Admin post not found"});
                };
                await Post.update({
                    contentPost: (contentPost && contentPost !== postFound.dataValues.contentPost)? contentPost: postFound.dataValues.contentPost,
                    linkContent: (linkContent && linkContent !== postFound.dataValues.linkContent)? linkContent: postFound.dataValues.linkContent,
                    imagePost: (imagePost && imagePost !== postFound.dataValues.imagePost)? imagePost: postFound.dataValues.imagePost,
                    nameStatusPost: 'Edited'
                    },
                    {where: {idPost}}
                );
                const postEdited = await Post.findByPk(idPost);
                return res.status(200).json({
                    msg: "Admin post edited successfully",
                    postEdited
                });
            } catch (e) {
                console.log(e)
                return res.status(500).json({ msgE: "Could not edit post admin" });
            }
        }
        deletePostAdmin = async (req, res) => {
            const {token, idPost} = req.body;
            try {
                let tokenDecode;
                try{
                    tokenDecode = jwt.decode(token);
                }catch{
                    return res.status(404).json({ msgE: "Could not find your user" })
                };
                const user = await User.findOne({
                    where: {userName: tokenDecode.userName},
                });
                if(!user) return res.status(404).json({ msgE: "Could not find your user" });
                if(user.dataValues.nameTypeUser !== 'Admin') return res.status(404).json({ msgE: "You are not admin" });
                const post = await Post.findByPk(idPost);
                if (!post)
                    return res
                    .status(404)
                    .json({ msgE: "The post with that id doest not exist" });
                if (!post.dataValues.isAdmin)
                    return res
                    .status(404)
                    .json({ msgE: "The post with that id doest not admin" });
                await post.destroy();
                return res.status(200).json({ msg: "Admin post deleted succesfully" });
            } catch (error) {
                return res.status(500).json({ msgE: "Post admin could not be deleted" });
            }
        };
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
        deletePostReport = async (req, res) => {
            try{
                const {idReport, idPost} = req.body;
                //Valido si existe el reporte y el post
                let deleteReport, deleteRowReport;
                const reportFound = await ReportPostCommentUser.findOne({
                    where: {idReport},
                    include: {
                        model: RowReport
                    }
                });
                if(!reportFound) return res.status(404).json({msgE: "Report not found"});
                const postFound = await Post.findOne({
                    where: {idPost}
                });
                if(!postFound) return res.status(404).json({msgE: "Post not found"});
                //Elimino el reporte
                deleteReport = await ReportPostCommentUser.destroy({
                    where: {idReport},
                    include:{
                        model: RowReport
                    }
                })
                //Elimino el reporte de cada persona vinculado con el reporte original
                deleteRowReport = await RowReport.destroy({
                    where: {idPostCommentUser: idPost},
                })
                //Valido si existen comentarios del post
                const commentPostReport = await Comment.findAll({where: {PostIdPost: idPost}});
                //Si existen comentarios del post, los borro
                if(commentPostReport.length){await Comment.destroy({where: {PostIdPost: idPost}})};
                //Elimino el post reportado
                await Post.destroy({where: {idPost}});  
                if(deleteReport && deleteRowReport){
                    return res.status(200).json({msg: "Deleted post"});
                }
                else{
                    return res.status(404).json({msgE: "could not delete report"});
                }
            }catch(e){
                console.log(e)
                res.status(404).json({msgE: "Post deletion failed"});
            }
        }
        allowPostReport = async (req, res) => {
            try{
                const {idReport, idPost} = req.body;
                //Valido si existe el reporte y el post
                let deleteReport, deleteRowReport;
                const reportFound = await ReportPostCommentUser.findOne({
                    where: {idReport},
                    include: {
                        model: RowReport
                    }
                });
                if(!reportFound) return res.status(404).json({msgE: "Report not found"});
                const postFound = await Post.findOne({
                    where: {idPost}
                });
                if(!postFound) return res.status(404).json({msgE: "Post not found"});
                //Elimino el reporte
                deleteReport = await ReportPostCommentUser.destroy({
                    where: {idReport},
                    include:{
                        model: RowReport
                    }
                })
                //Elimino el reporte de cada persona vinculado con el reporte original
                deleteRowReport = await RowReport.destroy({
                    where: {idPostCommentUser: idPost},
                });  
                if(deleteReport && deleteRowReport){
                    return res.status(200).json({msg: "Post allowed"});
                }
                else{
                    return res.status(404).json({msgE: "could not delete report"});
                }
            }catch(e){
                console.log(e)
                res.status(404).json({msgE: "allow failed post"});
            }
        }
        deleteCommentReport = async (req, res) => {
            try{
                const {idReport, idPost, idComment} = req.body;
                //Valido si existe el reporte, el post y el comentario
                let deleteReport, deleteRowReport;
                const reportFound = await ReportPostCommentUser.findOne({
                    where: {idReport},
                    include: {
                        model: RowReport
                    }
                });
                if(!reportFound) return res.status(404).json({msgE: "Report not found"});
                const postFound = await Post.findOne({
                    where: {idPost}
                });
                if(!postFound) return res.status(404).json({msgE: "Post not found"});
                const commentFound = await Comment.findOne({
                    where: {idComment}
                });
                if(!commentFound) return res.status(404).json({msgE: "Comment not found"});
                //Elimino el reporte
                deleteReport = await ReportPostCommentUser.destroy({
                    where: {idReport},
                    include:{
                        model: RowReport
                    }
                })
                //Elimino el reporte de cada persona vinculado con el reporte original
                deleteRowReport = await RowReport.destroy({
                    where: {idPostCommentUser: idComment},
                })
                //Elimino el comentario reportado
                const commentDeleted = await Comment.destroy({where: {idComment}});
                if(deleteReport && deleteRowReport && commentDeleted){
                    return res.status(200).json({msg: "Deleted post"});
                }
                else{
                    return res.status(404).json({msgE: "Could not delete report"});
                }
            }catch(e){
                console.log(e)
                res.status(404).json({msgE: "Comment deletion failed"});
            }
        }
        allowCommentReport = async (req, res) => {
            try{
                const {idReport, idPost, idComment} = req.body;
                //Valido si existe el reporte, el post y el comentario
                let deleteReport, deleteRowReport;
                const reportFound = await ReportPostCommentUser.findOne({
                    where: {idReport},
                    include: {
                        model: RowReport
                    }
                });
                if(!reportFound) return res.status(404).json({msgE: "Report not found"});
                const postFound = await Post.findOne({
                    where: {idPost}
                });
                if(!postFound) return res.status(404).json({msgE: "Post not found"});
                const commentFound = await Comment.findOne({
                    where: {idComment}
                });
                if(!commentFound) return res.status(404).json({msgE: "Comment not found"});
                //Elimino el reporte
                deleteReport = await ReportPostCommentUser.destroy({
                    where: {idReport},
                    include:{
                        model: RowReport
                    }
                });
                //Elimino el reporte de cada persona vinculado con el reporte original
                deleteRowReport = await RowReport.destroy({
                    where: {idPostCommentUser: idComment},
                });
                if(deleteReport && deleteRowReport){
                    return res.status(200).json({msg: "Comment allowed"});
                }
                else{
                    return res.status(404).json({msgE: "Could not delete report"});
                }
            }catch(e){
                console.log(e);
                res.status(404).json({msgE: "Allow failed comment"});
            }
        }
    //Plan Premium
        getPremiumPlan = async (req, res) => {
            try{
                const premiumPlans = await PlanPremium.findAll();
                return res.status(200).json(premiumPlans);
            }catch(e){
                return res.status(404).json({msgE: "There aren't premium plan"});
            }
        }
        creatPremiumPlan = async (req, res) => {
            let {priceMembership, namePlanPremium, numberOfMonths, discount} = req.body;
            try{
                if(discount) priceMembership =  parseFloat(priceMembership)-(Math.imul(parseFloat(discount),parseFloat(priceMembership))/100);
                const existPlan = await PlanPremium.findOrCreate({
                    where: {
                        [Op.or]: [{priceMembership},{namePlanPremium},{numberOfMonths}]
                    },
                    defaults: {
                        priceMembership,
                        namePlanPremium,
                        numberOfMonths,
                        discount: (discount)? true: false
                    }
                })
                if(!existPlan[1]){
                    if(existPlan[0].dataValues.namePlanPremium === namePlanPremium){return res.status(400).json({msgE: "premium plan with that existing name"})}
                    else if(existPlan[0].dataValues.priceMembership === priceMembership){return res.status(400).json({msgE: "premium plan with that existing price"})}
                    else if(existPlan[0].dataValues.numberOfMonths === numberOfMonths){return res.status(400).json({msgE: "premium plan with that number of existing months"})}
                }else{
                    res.status(200).json({msg: "successful premium plan creation"})
                }
            }catch(e){
                console.log(e)
                return res.status(400).json({msgE: "Error creating premium plan"})
            }
        }
        editPremiumPlan = async (req, res) => {
            let {idPlanPremium, priceMembership, numberOfMonths, discount} = req.body;
            try{
                if(!idPlanPremium) return res.status(404).json({msgE: "no premium plan id passed"});
                if(discount) priceMembership =  parseFloat(priceMembership)-(Math.imul(parseFloat(discount),parseFloat(priceMembership))/100);
                let premiumPlanFound;
                try{
                    premiumPlanFound = await PlanPremium.findOne({where: {idPlanPremium}});
                }catch{return res.status(404).json({msgE: "Premium plan not found"})}
                if(premiumPlanFound){
                    if(premiumPlanFound.dataValues.priceMembership === priceMembership && premiumPlanFound.dataValues.numberOfMonths === numberOfMonths){return res.status(400).json({msgE: "Premium plan with that price and existing number of months"})}
                }
                await PlanPremium.update({
                        priceMembership: (priceMembership && premiumPlanFound.dataValues.priceMembership !== priceMembership)? priceMembership: premiumPlanFound.dataValues.priceMembership,
                        numberOfMonths: (numberOfMonths && premiumPlanFound.dataValues.numberOfMonths !== numberOfMonths)? numberOfMonths: premiumPlanFound.dataValues.numberOfMonths,
                        discount: (discount)? true: false
                    },{
                        where: {idPlanPremium}
                    }
                )
                return res.status(200).json({msg: "successful premium plan edition"})
            }catch(e){
                console.log(e)
                return res.status(400).json({msgE: "Error editing premium plan"})
            }
        }
        cancelPremiumPlan = async (req, res) => {
            const {idPlanPremium} = req.body;
            try{
                if(!idPlanPremium) return res.status(404).json({msgE: "no premium plan id passed"});
                let premiumPlanFound;
                try{
                    premiumPlanFound = await PlanPremium.findOne({where: {idPlanPremium}});
                    if(!premiumPlanFound) return res.status(404).json({msgE: "Premium plan not found"})
                }catch{return res.status(404).json({msgE: "Premium plan not found"})}
                await PlanPremium.destroy({
                        where: {idPlanPremium}
                })
                return res.status(200).json({msg: "premium plan successfully canceled"})
            }catch(e){
                console.log(e)
                return res.status(400).json({msgE: "Error canceling premium plan"})
            }
        }
    //Banneo de usuarios
        getAllBannedUser = async (req, res) => {
            try{
                const allBannedUser = await User.findAll({
                    where: {nameStateUser: 'Banned'},
                    attributes: [
                        "idUser",
                        "name",
                        "lastName",
                        "email",
                        "gender",
                        "telephone",
                        "description",
                        "birthday",
                        "userName",
                        "nameTypeUser",
                        "MembershipUserIdMembershipUser"
                    ] 
                });
                return res.status(200).json(allBannedUser);
            }catch(e){
                return res.status(404).json({msgE: "There are no banned users"});
            }
        }
        banUser = async (req, res) => {
           const {idUser, causeBan} = req.body;
           try {
                let userFound;
                try{
                    userFound = await User.findOne({where: {idUser}});
                }catch{return res.status(404).json({msgE: "User not found"})}
                if(userFound.dataValues.nameStateUser === 'Banned') return res.status(400).json({msgE: 'Already banned user'});
                if(userFound.dataValues.nameStateUser === 'Inactive') return res.status(400).json({msgE: 'User inactive'});
                await User.update({nameStateUser: 'Banned'}, {where: {idUser}});
                await validation.userBanned(userFound.dataValues.name, userFound.dataValues.lastName, userFound.dataValues.email, causeBan);
                res.status(200).json({msg: "Banned user"});
            } catch (error) {
                console.log(error)
                res.status(500).json({msgE: "User ban error"});
            }       
        }
        unbanUser = async (req, res) => {
            const {idUser} = req.body;
            try {
                 let userFound;
                 try{
                     userFound = await User.findOne({where: {idUser}});
                 }catch{return res.status(404).json({msgE: "User not found"})}
                 if(userFound.dataValues.nameStateUser !== 'Banned') return res.status(400).json({msgE: 'User account not banned'});
                 await User.update({nameStateUser: 'Active'}, {where: {idUser}});
                 await validation.userUnbanned(userFound.dataValues.name, userFound.dataValues.lastName, userFound.dataValues.email);
                 res.status(200).json({msg: "Unbanned user"});
             } catch (error) {
                 console.log(error)
                 res.status(500).json({msgE: "User unbanned error"});
             }  
        }
}
module.exports = Admin;