const { User } = require("../../db.js");
const validation = require('../Validations/Validation')
const hashedFunctions = require('../Validations/HashedFunctions')

class UserClass {
  constructor(){}

  async getDataUser(idUser) {
    let userFind = await User.findByPk(idUser);
    return !userFind
      ? { msgE: "User not Found" }
      : {
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
      };
  }

  async createUser (name, lastName ,email, password, gender, telephone, description, admin, birthday, profileImage, userName, validationCode){
    password = hashedFunctions.passwordHash(password);
    const valid = await validation.validationRegisterEmailUsername(email, userName);
    // this.verifactionEmail(email)
    const codeNum = Math.floor(Math.random() * (999999 - 100000 + 1) + 100000);

    const nameMinus = name.charAt(0).toLowerCase() + name.slice(1);
    const lastNameMinus = lastName.charAt(0).toLowerCase() + lastName.slice(1);
    // if(telephone.toString().length > 9) throw new Error("Telephone must be 0 characters or less")
    if(valid) return valid;
    await validation.verifactionEmail(name, lastName, userName, email, codeNum)

    try {
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
          validationCode: codeNum
        });
      return {msg: 'User created successfully'}
    } catch (error) {
      console.log(error)
      return {msgE: 'Error creating a new user'}
    };
  };

  async loginUser(email, userName, password){
      //User login validation function
      //Validación por email
    if(email){
      try{
        const userFoundDB = await User.findOne({where: {email: email}})
        if(!userFoundDB) return {msgE: "Email user not found"}
          //Si no encuentro el email, corto la función y devuelvo mensaje de error.
        const passwordValidate = hashedFunctions.passwordHash(password).toString();
          //El resultado de passwordHash me trae un numero por lo cúal es necesario parsearlo.
        if(passwordValidate !== userFoundDB.dataValues.password) return {msgE: "Incorrect password"}
        console.log("Contraseña Correcta")
      }catch(error){console.log(error)}

      //Validación por userName
    }else if(userName){
      try{
        const userFoundDB = await User.findOne({where: {userName: userName}})
        if(!userFoundDB) return {msgE: "User name not found"}
          //Si no encuentro el email, corto la función y devuelvo mensaje de error.
        const passwordValidate = hashedFunctions.passwordHash(password).toString();
          //El resultado de passwordHash me trae un numero por lo cúal es necesario parsearlo.
        if(passwordValidate !== userFoundDB.dataValues.password) return {msgE: "Incorrect password"}
        console.log("Contraseña Correcta")
      }catch(error){console.log(error)}

    }else{
      return {msgE: "Incorrect data"}
    }
  }

};

// async function validation (email, userName) {
//   let findEmail = await User.findOne({where: {email: email}})
//   let findUserName = await User.findOne({where: {userName: userName}})
//   console.log(findEmail)
//   console.log(findUserName)
//   if(findEmail) {
//     return {msg: "This email has already been registered"}
//   }
//   if(findUserName) {
//     return {msg: "This username has already been registered"}
//   }
// }

module.exports = UserClass;