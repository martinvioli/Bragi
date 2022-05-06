const { User } = require("../db.js");
const validation = require('../Validations/auths.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth');
const { Op } = require("sequelize");


class UserClass {
  constructor(){}

  getPhotoUser = async (req, res) => {
    const userNameQuery = req.query.userName;
    // const tokenDecoded = jwt.decode(tokenUser);
    try{
    let userFind = await User.findOne({where: {userName: userNameQuery}});
    return !userFind
      ? res.status(404).json({ msgE: 'User not Found'})
      :res.status(200).end(userFind.profileImage);
    }catch(error){
      console.log(error)
      res.status(404).json({ msgE: 'Error to get photo'})
    }
  }

  getDataUser = async (req, res) => {
    const tokenUser = req.body.token;
    const tokenDecoded = jwt.decode(tokenUser);
    try{
    let userFind = await User.findOne({where: {userName: tokenDecoded.userName}});
    return !userFind
      ? res.status(404).json({ msgE: "User not Found" })
      :res.json({
        name: userFind.name,
        email: userFind.email,
        password: userFind.password,
        gender: userFind.gender,
        tel: userFind.tel,
        description: userFind.description,
        bithday: userFind.Bithday,
        userName: userFind.userName,
        lastName: userFind.lastName,
        stateUser: userFind.nameStateUser,
        typeUser: userFind.nameTypeUser
      });
    }catch(error){
      console.log(error)
      res.status(404).json({ msgE: 'Error getting user data'})
    }
  }

  createUser = async (req, res) => {
    let {name, lastName, email, password, gender, tel, description, birthday, profileImage, userName, repeatPassword} = req.body;
    password = bcrypt.hashSync(req.body.password, Number.parseInt(authConfig.rounds));
    if(!bcrypt.compareSync(repeatPassword, password)) return res.status(409).json({msgE: 'Passwords do not match'});

    const valid = await validation.validationRegisterEmailUsername(email, userName);
    if(valid) return res.status(400).send(valid);

    const codeNum = Math.floor(Math.random() * (999999 - 100000 + 1) + 100000);
    const nameMinus = name.charAt(0).toLowerCase() + name.slice(1);
    const lastNameMinus = lastName.charAt(0).toLowerCase() + lastName.slice(1);
  
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
          telephone: parseInt(tel) ,
          birthday,
          description,
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
      await User.update({token} , {where: {[Op.or]: [{ userName: userName}, {email: email}]}});
      return res.status(200).json({msg: 'Everything is fine (:', token, stateUser: userFoundDB.nameStateUser})
    }catch(error){
      return res.status(404).json({msgE: "User not found"});
    }
  }

  closeSessionUser = async (req,res) =>{
    const tokenUser = req.body.token;
    const tokenDecoded = jwt.decode(tokenUser);
    const userFind = await User.findOne({where: {userName: tokenDecoded.userName}});
    try {
      if(!userFind) return res.status(404).json({ msgE: 'There was an error finding the user' })
      await User.update({ token: null }, { where: {userName: tokenDecoded.userName} });
      return res.status(200).json({ msg: 'User logged out successfully'});
    } catch (error) {
      console.log(error)
      return res.status(404).json({ msgE: 'There was an error logging out' })
    }
  }

  changeUserToArtist = async (req, res) => {
    console.log('Route is legible')
    const { userName } = req.body;
    const userFoundDB = await User.findOne({where: {[Op.or]: [{ userName: userName}]}});
    try {
      console.log(userFoundDB.dataValues.nameTypeUser)
      if(!userFoundDB) return res.status(404).json({ msgE: 'Could not find the user' })
      if(userFoundDB.dataValues.nameTypeUser === 'Artist') return res.status(400).json({ msgE: 'The user was already Artist' })
      await User.update({nameTypeUser: 'Artist'}, {where: {[Op.or]: [{ userName: userName}]}})
      res.sendStatus(200).json({ msgE: 'User updated to Artist' })
    } catch (error) {
      console.log(error)
    }
  }

  changeUserToPremium = async (req, res) => {
    console.log('Route is legible')
    const { userName } = req.body;
    const userFoundDB = await User.findOne({where: {[Op.or]: [{ userName: userName}]}});
    try {
      if(!userFoundDB) return res.status(404).json({ msgE: 'Could not find the user' })
      if(userFoundDB.dataValues.nameTypeUser === 'Premium') return res.status(400).json({ msgE: 'The user was already Premium' })
      await User.update({nameTypeUser: 'Premium'}, {where: {[Op.or]: [{ userName: userName}]}})
      res.sendStatus(200).json({ msgE: 'User updated to Premium' })
    } catch (error) {
      console.log(error)
    }
  }

  changeUserToStandard = async (req, res) => {
    console.log('Route is legible')
    const { userName } = req.body;
    const userFoundDB = await User.findOne({where: {[Op.or]: [{ userName: userName}]}});
    try {
      if(!userFoundDB) return res.status(404).json({ msgE: 'Could not find the user' })
      if(userFoundDB.dataValues.nameTypeUser === 'Standard') return res.status(400).json({ msgE: 'The user was already Standard' })
      await User.update({nameTypeUser: 'Standard'}, {where: {[Op.or]: [{ userName: userName}]}})
      res.sendStatus(200).json({ msgE: 'User updated to Standard' })
    } catch (error) {
      console.log(error)
    }
  }

};

module.exports = UserClass;