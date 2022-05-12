const {User} = require('../db.js');

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

    //Banneo de usuarios
    baneoUser = async (req, res) => {
        
    }
    disbaneoUser = async (req, res) => {

    }

}

module.exports = Admin;