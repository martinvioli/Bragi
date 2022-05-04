
const { User } = require("../db.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authConfig = require("../config/auth");
const { Op } = require("sequelize");
class ProfileUser {
  constructor() {}

  editionBasicDataProfile = async (req, res) => {
    const { token, name, lastName, gender, description, birthday, profileImage} = req.body;
   
    try {
      /*-Primero busco el usuario para luego buscarlo cuando quiero actualizar los datos por el id*/
      password = bcrypt.hashSync(req.body.password, Number.parseInt(authConfig.rounds));
        if(!bcrypt.compareSync(repeatPassword, password)) return res.status(409).json({msgE: 'Passwords do not match'});
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
          name,
          lastName,
          email: (email !== userFound.email)? email: userFound.email,
          password,
          gender,
          description,
          birthday,
          userName: (userName !== userFound.userName)? userName: userFound.userName,
          profileImage,
          token,
        },
        { where: { idUser: userFound.dataValues.idUser } }
      );
      return !userUpdate.length
        ? res.status(404).json({ msgE: "Fail Edit profile" })
        : res.status(200).json({ msg: "Successful edit", token});
    } catch (error) {
      console.log(error);
    }
  };

  editionSensitiveDataProfile = (req, res) => {
    const {email, userName, password, repeatPassword} = req.body;
    const tokenDecode = jwt.decode(token, authConfig.secret);
    try{
        password = bcrypt.hashSync(req.body.password, Number.parseInt(authConfig.rounds));
        if(!bcrypt.compareSync(repeatPassword, password)) return res.status(409).json({msgE: 'Passwords do not match'});
          const userFound = await User.findOne({
            where: {
              [Op.or]: [
                { userName: tokenDecode.userName },
                { email: tokenDecode.email },
              ],
            },
          });
          if (!userFound) res.status(404).json({ msgE: "User not found" });
          const token = jwt.sign(
            { userName, email, TypeUser: userFound.dataValues.nameTypeUser}, authConfig.secret, { expiresIn: authConfig.expires });
    }catch(error){
        console.log(error)
    }
  }
}

module.exports = ProfileUser;