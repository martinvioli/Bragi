const { User, Comment, Follower, Followed} = require("../db.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authConfig = require("../config/auth");
const { Op } = require("sequelize");
class ProfileUser {
  constructor() {}

  editionBasicDataProfile = async (req, res) => {
    let dataPhoto;
    const {token, name, lastName, gender, description, birthday, tel} = req.body;
  
    //Si no se pasa el token, devolvemos un error
    if (!token) {
      return res.status(400).json({ msgE: "Token doesn't exist" });
    }
    //Valida si pasaron una foto
    try{
      dataPhoto = req.files.photoProfile.data;   
    }catch(e){
      console.log(e)
    }       
    if (req.files) {
      dataPhoto = req.files.photoProfile.data;
    }
    const tokenDecode = jwt.decode(token, authConfig.secret);
    try {
      /*-Primero busco el usuario para luego buscarlo cuando quiero actualizar los datos por el id*/
      const userFound = await User.findOne({
        where: {
          [Op.or]: [
            { userName: tokenDecode.userName },
            { email: tokenDecode.email },
          ],
        },
      });
      if (!userFound) res.status(404).json({ msgE: "User not found" });
      const userUpdate = await User.update(
        {
          //En el caso que alguno de los parámetros no me lo pasen, busco el valor que tiene el usuario y le setteo el mismo.
          name:
            name && name !== userFound.dataValues.name
              ? name
              : userFound.dataValues.name,
          lastName:
            lastName && lastName !== userFound.dataValues.lastName
              ? lastName
              : userFound.dataValues.lastName,
          gender:
            gender && gender !== userFound.dataValues.gender
              ? gender
              : userFound.dataValues.gender,
          description:
            description && description !== userFound.dataValues.description
              ? description
              : userFound.dataValues.description,
          telephone:
            tel && tel !== userFound.dataValues.telephone
              ? tel
              : userFound.dataValues.telephone,
          birthday:
            birthday && birthday !== userFound.dataValues.birthday
              ? birthday
              : userFound.dataValues.birthday,
          profileImage:
            dataPhoto && dataPhoto !== userFound.dataValues.profileImage
              ? dataPhoto
              : userFound.dataValues.profileImage,
        },
        { where: { idUser: userFound.dataValues.idUser } }
      );
      const userUpdatedSend = await User.findOne({where: {[Op.or]: [{ userName: tokenDecode.userName },{ email: tokenDecode.email }]}});
      return !userUpdate.length
        ? res.status(404).json({ msgE: "Fail Edit profile" })
        : res.status(200).json({ msg: "Successful edit", token, userUpdatedSend});
    } catch (error) {
      return res.status(404).json({ msgE: "Fail Edit profile" });
    }
  };

  editionSensitiveDataProfile = async (req, res) => {
    //Recibe doble password por la validación efectiva.
    const { token, email, userName, password, repeatPassword } = req.body;
    const tokenDecode = jwt.decode(token, authConfig.secret);
    try{
        const userFound = await User.findOne({where: {[Op.or]: [{ userName: tokenDecode.userName },{ email: tokenDecode.email }]}});
        if(!userFound) return res.status(404).json({ msgE: "User not found" }); 
        if(password && repeatPassword && password !== repeatPassword) return res.status(409).json({msgE: 'Passwords do not match'});
        let passwordHash;
        if(password && repeatPassword){passwordHash = bcrypt.hashSync(password, Number.parseInt(authConfig.rounds));}
        const token = jwt.sign({ userName, email, TypeUser: userFound.dataValues.nameTypeUser}, authConfig.secret, { expiresIn: authConfig.expires });
        const userEditSensitiveData = await User.update({
            email: (email !== userFound.dataValues.email)? email: userFound.dataValues.email,
            userName: (userName !== userFound.dataValues.userName)? userName: userFound.dataValues.userName,
            password: (passwordHash !== userFound.dataValues.password)? passwordHash: userFound.dataValues.password,
            token
        },{where: {idUser: userFound.dataValues.idUser}});
        try{
          const commentUser = await Comment.findAll({where: {idUserComment: userFound.dataValues.idUser}});
          if(commentUser.length){
            await Comment.update({userNameComment:userName},{where: {idUserComment: userFound.dataValues.idUser}})
          }
        }catch(error){
          console.log(error);
        }
        //Modifico mi userName en la tabla de seguidores de la otra persona.
        try{
          const followerUser = await Follower.findAll({where: {userProfileFollower: userFound.dataValues.idUser}});
          if(followerUser.length){
            await Follower.update({userNameFollower:userName},{where: {userProfileFollower: userFound.dataValues.idUser}})
          }else{
            console.log(followerUser)
          }

        }catch(error){
          console.log(error);
        }
        //Modifico mi userName en la tabla de seguidos de la otra persona que me sigue.
        try{
          const followedUser = await Followed.findAll({where: {userProfileFollowed: userFound.dataValues.idUser}});
          if(followedUser.length){
            await Followed.update({userNameFollowed:userName},{where: {userProfileFollowed: userFound.dataValues.idUser}})
          }else{
            console.log(followedUser)
          }
        }catch(error){
          console.log(error);
        }
        const userUpdatedSend = await User.findOne({where: {[Op.or]: [{userName},{email}]}});
        return !userEditSensitiveData.length
        ? res.status(404).json({ msgE: "Fail Edit profile" })
        : res.status(200).json({ msg: "Successful edit", token, userUpdatedSend});
      }catch(error){
        return res.status(404).json({ msgE: "Fail Edit profile" });
      }
  };
}

module.exports = ProfileUser;
