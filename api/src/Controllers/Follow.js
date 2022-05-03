const { Follower } = require('../db');
const { User } = require('../db');
const jwt = require('jsonwebtoken');

class Follow{
    constructor(){}

    followAction = async(req, res) => { //user1 -> user2
        const { token, idFollower} = req.body//token de user1 y id de user2
        const tokenDecode = jwt.decode(token)

        try {
            const user = await User.findOne({ //busco a user1
                where: {
                    userName: tokenDecode.userName
                }
            })
            if(!user) return res.status(404).json({ msgE: 'Could not find your user' })

            const userFollowed = await Follower.findOne({ //busco a el user1 dentro de los seguidores de user2
                where:{
                    userProfileFollower: user.idUser,
                    userNameFollower: user.userName,
                }
            })
            if(userFollowed)return res.status(406).json({ msgE: "You already followed this user" })

            const userFollowedCreate = await Follower.create({userProfileFollower: user.idUser, userNameFollower: tokenDecode.userName})//si no esta lo creo
            const followed = await userFollowedCreate.setUser(idFollower)//vinculo a user1 con user2
            if(followed) return res.status(200).json({ msg: "User followed correctly"})
            return res.status(418).json({ msgE: "There was an error trying to follow the user"})
        } catch (error) {
            console.log(error)
            return res.status(404).json({ msgE: "The follow action failed" })
        }
    }

    unFollowAction = async(req,res) => { //user1 -/->  user2
        const { token } = req.body //llega el token de user1
        const tokenDecode = jwt.decode(token)

        try {
            const findFollower = await Follower.findOne({ //busco a user1
                where:{
                    userNameFollower: tokenDecode.userName
                }
            })
            if(!findFollower) return res.status(404).json({ msgE:"You are not following this user" }) //si no lo encuentra no lo sigue

            const kaBum = await findFollower.destroy()// se borra el user1 de la tabla de user2
            return res.status(200).json({ msg: "User unfollowed correctly"})
        } catch (error) {
            console.log(error)
            return res.status(404).json({ msgE: "The follow action failed" })
        }
    }

}

module.exports = Follow;