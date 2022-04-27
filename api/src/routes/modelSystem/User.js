const { User } = require("../../db.js");

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

  async validation (email, userName) {
    try {
      let findUserName = await User.findOne({where: {userName: userName}})
      if(findUserName) return {msgE: "This username has already been registered"}
    } catch (error) {
      console.log(error)
    }

    try {
      let findEmail = await User.findOne({where: {email: email}})
      if(findEmail) return {msgE: "This email has already been registered"}
    } catch (error) {
      console.log(error)
    }
  }

  async createUser (name, lastName ,email, password, gender, telephone, description, admin, birthday, profileImage, userName){
    const valid = await this.validation(email, userName);

    if(valid) return valid;

    try {
        const user = await User.create(
        {
          name,
          lastName ,
          email,
          password,
          gender,
          telephone,
          birthday,
          description,
          admin,
          profileImage,
          userName
        });
      return {msg: 'User created successfully'}
    } catch (error) {
      return {msgE: 'Error creating a new user'}
    };

  };

  passwordHash(str, seed = 0) {
    let h1 = 0xdeadbeef ^ seed, h2 = 0x41c6ce57 ^ seed;
    for (let i = 0, ch; i < str.length; i++) {
        ch = str.charCodeAt(i);
        h1 = Math.imul(h1 ^ ch, 2654435761);
        h2 = Math.imul(h2 ^ ch, 1597334677);
    }
    h1 = Math.imul(h1 ^ (h1>>>16), 2246822507) ^ Math.imul(h2 ^ (h2>>>13), 3266489909);
    h2 = Math.imul(h2 ^ (h2>>>16), 2246822507) ^ Math.imul(h1 ^ (h1>>>13), 3266489909);
    return 4294967296 * (2097151 & h2) + (h1>>>0);
  };

  async loginUser(email, userName, password){
      //User login validation function
      //Validación por email
    if(email){
      try{
        const userFoundDB = await User.findOne({where: {email: email}})
        if(!userFoundDB) return {msgE: "Email user not found"}
          //Si no encuentro el email, corto la función y devuelvo mensaje de error.
        const passwordValidate = this.passwordHash(password).toString();
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
        const passwordValidate = this.passwordHash(password).toString();
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