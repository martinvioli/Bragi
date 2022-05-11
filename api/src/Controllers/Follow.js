const { Follower } = require('../db');
const { User } = require('../db');
const { Followed } = require('../db');
const jwt = require('jsonwebtoken');

class Follow{
    constructor(){}

    //Las siguientes 2 funciones, tratan sobre un usuario que sigue a otro y que lo deja de seguir
    followAction = async(req, res) => { //user1 -> user2
        const { token, tokenFollowed} = req.body//token de user1 y token de user2
        const tokenDecode = jwt.decode(token)
        const decodeFollowed = jwt.decode(tokenFollowed)
        // console.log(decodeFollowed)

        try {
            const userFwer = await User.findOne({ //busco a user1
                where: {
                    userName: tokenDecode.userName
                }
            })
            if(!userFwer) return res.status(404).json({ msgE: 'Could not find your user' })
            // console.log(user)

            const userFwed = await User.findOne({ //busco a user2
                where: {
                    userName: decodeFollowed.userName
                }
            })
            if(!userFwer) return res.status(404).json({ msgE: 'Could not find your user' })

            const userFollower = await Follower.findOne({ //busco a el user1 dentro de los seguidores
                where:{
                    userProfileFollower: userFwer.idUser,
                    userNameFollower: userFwer.userName,
                }
            })
            console.log(userFollower)
            // if(userFollower.userProfileFollower === user.idUser && userFollower.UserIdUser === idFollowed){
            //     return res.status(406).json({ msgE: "You already follow this user" })
            // }

            const userFollowerCreate = await Follower.create({userProfileFollower: userFwer.idUser, userNameFollower: userFwer.userName})//si no esta lo creo

            const follower = await userFollowerCreate.setUser(userFwed.idUser)//vinculo a user1 con user2
            const followeded = await this.followed(userFwer.idUser, userFwer.userName, userFwed.idUser)
            console.log(followeded)

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
    followed = async(idFollower, userNameFollowed, idFollowed) => { //follower: user1, followed: user2
        const findFollowed = await User.findOne({ where: { idUser: idFollower }}) //findfollowed === user2
        if(!findFollowed)return 'asd'

        const newFollowed = await Followed.create({ userProfileFollowed: idFollowed, userNameFollowed: userNameFollowed })//le insertamos a user2. user1
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