const { User, Post, Like, Comment, Followed, Follower , MembershipUser, PlanPremium} = require("../db.js");
const validation = require("../Validations/auths.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authConfig = require("../config/auth");
const { Op } = require("sequelize");
const sequelize = require("sequelize");
const axios = require("axios");
const fs = require("fs");
class UserClass {
  constructor() {}

  getAllUsers = async (req, res) => {
    try {
      const users = await User.findAll({
        atributes: [
          "idUser",
          "name",
          "lastName",
          "email",
          "password",
          "gender",
          "telephone",
          "birthday",
          "description",
          "userName",
          "profileImage",
          "nameTypeUser",
          "nameStateUser",
        ],
      });
      return res.status(200).json(users);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };

  getPhotoUser = async (req, res) => {
    const userNameQuery = req.query.userName;
    // const tokenDecoded = jwt.decode(tokenUser);
    try {
      let userFind = await User.findOne({ where: { userName: userNameQuery } });
      return !userFind
        ? res.status(404).json({ msgE: "User not Found" })
        : res.status(200).end(userFind.profileImage);
    } catch (error) {
      console.log(error);
      res.status(404).json({ msgE: "Error to get photo" });
    }
  };

  getDataUser = async (req, res) => {
    const tokenUser = req.body.token;
    const tokenDecoded = jwt.decode(tokenUser);
    try {
      let userFind = await User.findOne({
        where: { userName: tokenDecoded.userName },
      });
      console.log(userFind);
      return !userFind
        ? res.status(404).json({ msgE: "User not Found" })
        : res.json({
            name: userFind.name,
            email: userFind.email,
            password: userFind.password,
            gender: userFind.gender,
            tel: userFind.telephone,
            description: userFind.description,
            bithday: userFind.Bithday,
            userName: userFind.userName,
            lastName: userFind.lastName,
            stateUser: userFind.nameStateUser,
            typeUser: userFind.nameTypeUser,
          });
    } catch (error) {
      console.log(error);
      res.status(404).json({ msgE: "Error getting user data" });
    }
  };

  getProfileUser = async (req, res) => {
    const { token, userName } = req.body;
    const userFoundDB = await User.findOne({
      where: { userName },
      include: [
        {
          model: Post,
          include: [
            {
              model: Like,
              attributes: ["userName"],
            },
            { model: Comment },
            { model: User, attributes: ["userName"] },
          ],
        },
        {
          model: Follower,
          attributes: ["userNameFollower"],
        },
        {
          model: Followed,
          attributes: ["userNameFollowed"],
        },
      ],
    });
    if (!userFoundDB) return res.status(404).json({ msgE: "User not found" });
    res.status(200).json(userFoundDB);
  };

  createUser = async (req, res) => {
    let {
      name,
      lastName,
      email,
      password,
      gender,
      tel,
      description,
      birthday,
      profileImage,
      userName,
      repeatPassword,
    } = req.body;
    password = bcrypt.hashSync(
      req.body.password,
      Number.parseInt(authConfig.rounds)
    );
    if (!bcrypt.compareSync(repeatPassword, password))
      return res.status(409).json({ msgE: "Passwords do not match" });

    const valid = await validation.validationRegisterEmailUsername(
      email,
      userName
    );
    if (valid) return res.status(400).send(valid);

    const planPremium = await PlanPremium.create({
      priceMembership: 2.0,
      namePlanPremium: 'Standar',
      numberOfMonths: 3
    })
    const codeNum = Math.floor(Math.random() * (999999 - 100000 + 1) + 100000);
    const nameMinus = name.charAt(0).toLowerCase() + name.slice(1);
    const lastNameMinus = lastName.charAt(0).toLowerCase() + lastName.slice(1);

    //Obtiene la foto del enlace en modo de bufer y la almacena en la DB como imagen de defecto.
    const photo = await axios.get(
      "https://i.pinimg.com/564x/e5/91/dc/e591dc82326cc4c86578e3eeecced792.jpg",
      { responseType: "arraybuffer" }
    );

    //Send Email
    await validation.verifactionEmail(name, lastName, userName, email, codeNum);
    try {
      const token = jwt.sign(
        { userName, email, TypeUser: "Standard" },
        authConfig.secret,
        {
          expiresIn: authConfig.expires,
        }
      );
      const user = await User.create({
        name: nameMinus,
        lastName: lastNameMinus,
        email,
        password,
        gender,
        telephone: parseInt(tel),
        birthday,
        description,
        profileImage: photo.data,
        userName,
        validationCode: codeNum,
        token,
      });
      const today = new Date();
      const membershipUser = await MembershipUser.create({
        statePlan:'Inactive',
        dateStart: today.getDate()+'-'+(today.getMonth()+1)+'-'+(today.getFullYear()),
        dateExpiry: today.getDate()+'-'+(today.getMonth()+(3))+'-'+(today.getFullYear())
      })
      planPremium.addMembershipUser(membershipUser);
      membershipUser.addUser(user);
      return res.status(200).json({ msg: "User created successfully", token }); //Prueba para el front
    } catch (error) {
      console.log(error);
      return res.status(409).json({ msgE: "Error creating a new user" });
    }
  };

  resetPasswordPost = async(req, res) => {
    let { code, password, repeatPassword } = req.body;
    try {
      const findUser = await User.findOne({ where: { validationCode: code } })
      if(!findUser)return res.status(404).json({ msgE: "We have trouble findind your user" })
      if(findUser){
      password = bcrypt.hashSync(
        req.body.password,
        Number.parseInt(authConfig.rounds)
      );
      if (!bcrypt.compareSync(repeatPassword, password)) return res.status(409).json({ msgE: "Passwords do not match" });
      await findUser.update({ password, repeatPassword })
      return res.status(200).json({ msg: "Password changed succesfully" })
      }
    } catch (error) {
      console.log(error)
      res.status(500).json({ msgE: "Something went wrong", error })
    }
  }

  resetPasswordPre = async(req, res) => {
    const { email, code } = req.body;
    const codeNum = Math.floor(Math.random() * (999999 - 100000 + 1) + 100000);
    console.log(codeNum)
    try {
        const findUser = await User.findOne({ where: { email } })
        if(!findUser) return res.status(404).json({ msgE: "We have trouble findind your user" })
        if (findUser){
          await findUser.update({validationCode: codeNum})
          const emailVerify = await validation.recoverEmail(email, codeNum)
          return res.status(200).json({ msg: "Mail send", findUser, codeNum });
        }
    } catch (error) {
      console.log(error)
      res.status(500).json({ msgE: "Something went wrong", error })
    }
  }

  loginUser = async (req, res) => {
    //User login validation function
    const { email, userName, password } = req.body;
    try {
      const userResponse = await validation.validationLoginUser(
        email,
        userName,
        password
      );
      if (userResponse) return res.status(404).json(userResponse);
      const userFoundDB = await User.findOne({
        where: { [Op.or]: [{ userName: userName }, { email: email }] },
      });
      const token = jwt.sign(
        {
          userName: userFoundDB.userName,
          email: userFoundDB.email,
          TypeUser: userFoundDB.nameTypeUser,
        },
        authConfig.secret,
        { expiresIn: authConfig.expires }
      );
      await User.update(
        { token },
        { where: { [Op.or]: [{ userName: userName }, { email: email }] } }
      );
      return res.status(200).json({
        msg: "Everything is fine (:",
        token,
        stateUser: userFoundDB.nameStateUser,
      });
    } catch (error) {
      return res.status(404).json({ msgE: "User not found" });
    }
  };

  closeSessionUser = async (req, res) => {
    const tokenUser = req.body.token;
    const tokenDecoded = jwt.decode(tokenUser);
    const userFind = await User.findOne({
      where: { userName: tokenDecoded.userName },
    });
    try {
      if (!userFind)
        return res
          .status(404)
          .json({ msgE: "There was an error finding the user" });
      await User.update(
        { token: null },
        { where: { userName: tokenDecoded.userName } }
      );
      return res.status(200).json({ msg: "User logged out successfully" });
    } catch (error) {
      console.log(error);
      return res.status(404).json({ msgE: "There was an error logging out" });
    }
  };

  changeUserToArtist = async (req, res) => {
    console.log("Route is legible");
    const { userName } = req.body;
    const userFoundDB = await User.findOne({
      where: { [Op.or]: [{ userName: userName }] },
    });
    try {
      console.log(userFoundDB.dataValues.nameTypeUser);
      if (!userFoundDB)
        return res.status(404).json({ msgE: "Could not find the user" });
      if (userFoundDB.dataValues.nameTypeUser === "Artist")
        return res.status(400).json({ msgE: "The user was already Artist" });
      await User.update(
        { nameTypeUser: "Artist" },
        { where: { [Op.or]: [{ userName: userName }] } }
      );
      res.sendStatus(200).json({ msgE: "User updated to Artist" });
    } catch (error) {
      console.log(error);
    }
  };

  changeUserToPremium = async (req, res) => {
    console.log("Route is legible");
    const { userName } = req.body;
    const userFoundDB = await User.findOne({
      where: { [Op.or]: [{ userName: userName }] },
    });
    try {
      if (!userFoundDB)
        return res.status(404).json({ msgE: "Could not find the user" });
      if (userFoundDB.dataValues.nameTypeUser === "Premium")
        return res.status(400).json({ msgE: "The user was already Premium" });
      await User.update(
        { nameTypeUser: "Premium" },
        { where: { [Op.or]: [{ userName: userName }] } }
      );
      res.sendStatus(200).json({ msgE: "User updated to Premium" });
    } catch (error) {
      console.log(error);
    }
  };

  changeUserToStandard = async (req, res) => {
    console.log("Route is legible");
    const { userName } = req.body;
    const userFoundDB = await User.findOne({
      where: { [Op.or]: [{ userName: userName }] },
    });
    try {
      if (!userFoundDB)
        return res.status(404).json({ msgE: "Could not find the user" });
      if (userFoundDB.dataValues.nameTypeUser === "Standard")
        return res.status(400).json({ msgE: "The user was already Standard" });
      await User.update(
        { nameTypeUser: "Standard" },
        { where: { [Op.or]: [{ userName: userName }] } }
      );
      res.sendStatus(200).json({ msgE: "User updated to Standard" });
    } catch (error) {
      console.log(error);
    }
  };

  getUserPosts = async (req, res) => {
    const { userName } = req.params;
    const user = await User.findOne({ where: { userName } });

    try {
      const posts = await Post.findAll({
        atributes: [
          "idPost",
          "datePost",
          "contentPost",
          "linkContent",
          "imagePost",
        ],
        include: [
          { model: Like, attributes: ["userName"] },
          { model: Comment, attributes: ["userNameComment"] },
        ],
        where: { UserIdUser: user.idUser },
      });
      return res.status(200).json(posts);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };
}

module.exports = UserClass;
