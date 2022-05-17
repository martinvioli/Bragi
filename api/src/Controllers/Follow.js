const { Follower } = require('../db');
const { User } = require('../db');
const { Followed } = require('../db');
const jwt = require('jsonwebtoken');
const {Op} = require("sequelize");

class Follow{
    constructor(){}

    //Las siguientes 2 funciones, tratan sobre un usuario que sigue a otro y que lo deja de seguir
    followAction = async(req, res) => { //user1 -> user2
        const { token, tokenFollowed} = req.body//token de user1 y token de user2
        const tokenDecode = jwt.decode(token)
        const decodeFollowed = jwt.decode(tokenFollowed)
        // console.log(decodeFollowed)

        try {
            const userFwer = await User.findOne({ //busco a user1. El user seguidor
                where: {
                    userName: tokenDecode.userName
                }
            })
            if(!userFwer) return res.status(404).json({ msgE: 'Could not find your user' })
            // console.log(user)

            const userFwed = await User.findOne({ //busco a user2. El user seguido
                where: {
                    userName: decodeFollowed.userName
                }
            })
            if(!userFwer) return res.status(404).json({ msgE: 'Could not find the user'})

            const userFollower = await Followed.findOne({ //busco en la tabla Followed para ver si ya el user 1 sigue al usuario
                where:{
                    userProfileFollowed: userFwed.dataValues.idUser,
                }
            })
            if(userFollower){return res.status(400).json({msgE: "You already follow this user"})}

            const userFollowerCreate = await Follower.create({userProfileFollower: userFwer.idUser, userNameFollower: userFwer.userName})//si no esta lo creo
            const follower = await userFollowerCreate.setUser(userFwed.idUser);//vinculo a user1 con user2
            const followeded = await this.followed(userFwer.idUser, userFwed.userName, userFwed.idUser);
            if(follower) return res.status(200).json({ msg: "User followed correctly"});
            return res.status(418).json({ msgE: "There was an error trying to follow the user"});
        } catch (error) {
            return res.status(404).json({ msgE: "The follow action failed" });
        }
    }

    unFollowAction = async(req,res) => { //user1 -/->  user2
        const { token, tokenFollowed } = req.body //llega el token de user1
        const tokenDecode = jwt.decode(token)
        const decodeFollowed = jwt.decode(tokenFollowed)

        try {
            const userFwer = await User.findOne({ //busco a user2
                where: {
                    userName: tokenDecode.userName
                }
            })
            // if(!userFwed) return res.status(404).json({ msgE: 'Could not find your user' })
            const userFwed = await User.findOne({ //busco a user2
                where: {
                    userName: decodeFollowed.userName
                }
            })
            // if(!userFwed) return res.status(404).json({ msgE: 'Could not find your user' })

            const findFollower = await Follower.findOne({ //busco a user1
                where:{
                    [Op.and] : {
                        userNameFollower: userFwer.userName,
                        UserIdUser: userFwed.idUser
                    }
                }
            })
            if(!findFollower) return res.status(404).json({ msgE: "You are not following this user" }) //si no lo encuentra no lo sigue

            const followedDelete = await this.unFollowed(userFwed.userName, userFwer.idUser)
            const kaBum = await findFollower.destroy()// se borra el user1 de la tabla de user2
            return res.status(200).json({ msg: "User unfollowed correctly"})
        } catch (error) {
            console.log(error)
            return res.status(404).json({ msgE: "The follow action failed" })
        }
    }


//foolowed cuando siga a alguien va a invocar a follwAction
    followed = async(idFollower, userNameFollowed, idFollowed) => { //follower: user1, followed: user2
        const findFollowed = await User.findOne({ where: { idUser: idFollower }}); //findfollowed === user2
        if(!findFollowed) return 'asd'

        const newFollowed = await Followed.create({ userProfileFollowed: idFollowed, userNameFollowed: userNameFollowed })//le insertamos a user2. user1
        const followed = await newFollowed.setUser(findFollowed.idUser)
    }

    unFollowed = async(userNameFollowed, UserIdUser) => {
        const findFollowedInDb = await Followed.findOne({ //busco a user1
                where:{
                    [Op.and] : {
                        userNameFollowed: userNameFollowed,
                        UserIdUser: UserIdUser
                    }
                }
            })
        if(!findFollowedInDb) return { msgE: "Error in the function" }

        const deleteFollowed = await findFollowedInDb.destroy()
        return { msg: "Unfollowed correctly" }
    }

    getFollowers = async(req,res) => {
        const { userName } = req.body;
        try {

            const user = await User.findOne({ //busco a user2
                where: {
                    userName: userName
                }
            })

            const followers = await Follower.findAll({ where: { UserIdUser: user.idUser } })
            console.log(1, followers)
            return res.status(200).json(followers)
        } catch (error) {
            console.log(error)
            return res.status(500).send(error)
        } 
    }

    getFolloweds = async(req,res) => {
        const {userName} = req.body;
        try {
            const user = await User.findOne({ //busco a user2
                where: {
                    userName: userName
                }
            })
            const followeds = await Followed.findAll({ where: { UserIdUser: user.idUser } })
            console.log(1, followeds)
            return res.status(200).json(followeds)
        } catch (error) {
            console.log(error)
            return res.status(500).send(error)
        }
    }
}

module.exports = Follow;