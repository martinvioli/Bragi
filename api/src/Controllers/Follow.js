const { Follower } = require('../db');
const { User } = require('../db');
const { Followed } = require('../db');
const jwt = require('jsonwebtoken');

class Follow{
    constructor(){}

    //Las siguientes 2 funciones, tratan sobre un usuario que sigue a otro y que lo deja de seguir
    followAction = async(req, res) => { //user1 -> user2
        const { token, idFollowed} = req.body//token de user1 y id de user2
        const tokenDecode = jwt.decode(token)

        try {
            const user = await User.findOne({ //busco a user1
                where: {
                    userName: tokenDecode.userName
                }
            })
            if(!user) return res.status(404).json({ msgE: 'Could not find your user' })
            // console.log(user)

            const userFollower = await Follower.findOne({ //busco a el user1 dentro de los seguidores de user2
                where:{
                    userProfileFollower: user.idUser,
                    userNameFollower: user.userName,
                }
            })
            if(userFollower)return res.status(406).json({ msgE: "You already follow this user" })

            const userFollowerCreate = await Follower.create({userProfileFollower: user.idUser, userNameFollower: tokenDecode.userName})//si no esta lo creo

            const follower = await userFollowerCreate.setUser(idFollowed)//vinculo a user1 con user2
            const followeded = await this.followed(user.idUser, user.userName, idFollowed)

            if(follower) return res.status(200).json({ msg: "User followed correctly"})
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

            const followedDelete = this.unFollowed(tokenDecode.userName)
            const kaBum = await findFollower.destroy()// se borra el user1 de la tabla de user2
            return res.status(200).json({ msg: "User unfollowed correctly"})
        } catch (error) {
            console.log(error)
            return res.status(404).json({ msgE: "The follow action failed" })
        }
    }

//foolowed cuando siga a alguien va a invocar a follwAction
    followed = async(idFollower, userNameFollower, idFollowed) => { //follower: user1, followed: user2
        const findFollowed = await User.findOne({ where: { idUser: idFollowed }}) //user2
        if(!findFollowed)return 'asd'

        const newFollowed = await Followed.create({ userProfileFollowed: idFollower, userNameFollowed: userNameFollower })//le insertamos a user2. user1
        const followed = await findFollowed.setFolloweds(newFollowed)
    }

    unFollowed = async(userNameFollower) => {
        const findFollowedInDb = await Followed.findOne({ where: { userNameFollowed: userNameFollower } })
        if(!findFollowedInDb) return { msgE: "Error in the function" }

        const deleteFollowed = await findFollowedInDb.destroy()
        return { msg: "Unfollowed correctly" }
    }
}

module.exports = Follow;