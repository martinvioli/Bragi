const { User } = require("../db.js");
const validation = require('../Validations/auths.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth');
const { Op } = require("sequelize");

class UserClass {
  constructor(){}

  getDataUser = async (req, res) => {
    const tokenUser = req.body.token;
    const tokenDecoded = jwt.decode(tokenUser);
    try{
    let userFind = await User.findOne({where: {userName: tokenDecoded.userName}});
    return !userFind
      ? res.status(404).json({ msgE: "User not Found" })
      : res.status(200).json({
          name: userFind.name,
          email: userFind.email,
          password: userFind.password,
          gender: userFind.gender,
          tel: userFind.tel,
          description: userFind.description,
          admin: userFind.admin,
          bithday: userFind.Bithday,
          profileImage: userFind.profileImage,
          userName: userFind.userName,
          lastName: userFind.lastName
      });
    }catch(error){
      console.log(error)
    }
  }
   

  createUser = async (req, res) => {
    let {name, lastName,email, password, gender, telephone, description, admin, birthday, profileImage, userName} = req.body;
    password = bcrypt.hashSync(req.body.password, Number.parseInt(authConfig.rounds));
    const valid = await validation.validationRegisterEmailUsername(email, userName);
    // this.verifactionEmail(email)
    const codeNum = Math.floor(Math.random() * (999999 - 100000 + 1) + 100000);
    const nameMinus = name.charAt(0).toLowerCase() + name.slice(1);
    const lastNameMinus = lastName.charAt(0).toLowerCase() + lastName.slice(1);
    // if(telephone.toString().length > 9) throw new Error("Telephone must be 0 characters or less")
    if(valid) return valid;
    //Send Email
    await validation.verifactionEmail(name, lastName, userName, email, codeNum);
    try {
      const token = jwt.sign({userName , email, TypeUser: 'Standard'}, authConfig.secret, {
        expiresIn: authConfig.expires
      });
      const user = await User.create(
        {
          name: nameMinus,
          lastName: lastNameMinus ,
          email,
          password,
          gender,
          telephone,
          birthday,
          description,
          admin,
          profileImage,
          userName,
          validationCode: codeNum,
          token
        });
        
      return res.status(200).json({msg: 'User created successfully', token}); //Prueba para el front
    } catch (error) {
      console.log(error)
      return res.status(409).json({msgE: 'Error creating a new user'});
    };
  };

  loginUser = async (req, res) => {
    //User login validation function
    const {email, userName, password} = req.body;
    try{
      const userResponse = await validation.validationLoginUser(email, userName, password);
      if (userResponse) return res.status(404).json(userResponse);
      const userFoundDB = await User.findOne({where: {[Op.or]: [{ userName: userName}, {email: email}]}});
      const token = jwt.sign({ userName: userFoundDB.userName, email: userFoundDB.email ,TypeUser: userFoundDB.nameTypeUser }, authConfig.secret, {expiresIn: authConfig.expires});
      await User.update({token} , {where: {[Op.or]: [{ userName: userName}, {email: email}]}})
      return res.status(200).json({msg: 'Everything is fine (:', token})
    }catch(error){
      return res.status(404).json({msgE: "User not found"});
    }
  }

};

module.exports = UserClass;